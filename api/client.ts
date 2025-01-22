import WebSocket from 'isomorphic-ws'
import { CCatAPI } from './CCatAPI'
import { 
    SocketResponse, SocketError, 
    WebSocketState, WebSocketSettings,
    isMessageResponse, CatSettings,
    SocketRequest,
    isTokenResponse,
} from './utils'

/**
 * The class to communicate with the Cheshire Cat AI
 */
export class CatClient {
    private config!: CatSettings
    private apiClient: CCatAPI | undefined
    private ws: WebSocket | undefined
    private connectedHandler?: () => void
    private disconnectedHandler?: () => void
    private messageHandler?: (data: SocketResponse) => void
    private errorHandler?: (error: SocketError, event?: WebSocket.ErrorEvent) => void
    private explicitlyClosed = false
    private retried = 0
    
    /**
     * Initialize the class with the specified settings
     * @param settings The settings to pass
     */
    constructor(settings: CatSettings) {
        this.config = {
            secure: false,
            instant: true,
            timeout: 10000,
            port: 1865,
            userId: 'user',
            ...settings
        }
        if (this.config.instant) this.init()
    }

    private initWebSocket() {
        const wsConfig = this.config.ws = {
            delay: 3000,
            retries: 3,
            ...this.config.ws
        } satisfies WebSocketSettings
        const userId = this.config.userId ?? 'user'
        const url = this.url.replace(/http/g, 'ws')
        const query = this.config.credential ? `?token=${this.config.credential}` : ''
        this.ws = new WebSocket(`${url}/ws/${userId}${query}`)
        this.ws.onopen = () => {
            this.retried = 0
            this.connectedHandler?.()
        }
        this.ws.onclose = () => {
            if (!this.explicitlyClosed) {
                this.retried += 1
                if (wsConfig.retries < 0 || this.retried < wsConfig.retries) {
                    setTimeout(() => this.initWebSocket(), wsConfig.delay)
                } else wsConfig.onFailed?.({
                    name: 'FailedRetry',
                    description: `Failed to connect WebSocket after ${wsConfig.retries} retries.`
                })
            }
            this.disconnectedHandler?.()
        }
        this.ws.onmessage = (event) => {
            if (typeof event.data != 'string') return
            const data = JSON.parse(event.data) as SocketError | SocketResponse
            if (isMessageResponse(data)) {
                this.messageHandler?.(data)
                return
            } else if (isTokenResponse(data)) {
                this.messageHandler?.(data)
                return
            }
            this.errorHandler?.(data)
        }
        this.ws.onerror = (event) => {
            this.errorHandler?.({
                name: 'SocketError',
                description: 'Something went wrong while connecting to the server'
            }, event)
        }
    }

    /**
     * Resets the current `CatClient` instance.
     * @returns The updated `CatClient` instance.
     */
    reset(): CatClient {
        this.retried = 0
        this.close()
        this.ws = undefined
        this.apiClient = undefined
        return this
    }

    /**
     * Initialize the WebSocket and the API Client
     * @returns The current `CatClient` class instance
     */
    init(): CatClient {
        if (!this.ws && !this.apiClient) {
            this.initWebSocket()
            this.apiClient = new CCatAPI({
                BASE: `${this.url}`,
                HEADERS: {
                    ...this.config.credential ? {
                        'access_token': this.config.credential,
                        'Authorization': `Bearer ${this.config.credential}`,
                    } : {},
                    'user_id': this.config.userId ?? 'user',
                }
            })
        }
        return this
    }

    /**
     * Sends a message to the Cat through the WebSocket connection.
     * @param msg The message to send to the Cat.
     * @param userId The ID of the user sending the message. Defaults to "user".
     * @throws If the message does not contain text, audio or image.
     * @returns The `CatClient` instance.
     */
    send(msg: SocketRequest, userId?: string): CatClient {
        if (this.ws?.readyState !== WebSocket.OPEN) {
            this.errorHandler?.({
                name: 'SocketClosed',
                description: 'The connection to the server was closed'
            })
            return this
        }
        if ('text' in msg || 'audio' in msg || 'image' in msg) {
            const jsonMessage = JSON.stringify({ 
                ...msg,
                user_id: userId ?? (this.config.userId ?? 'user'),
            })
            this.ws.send(jsonMessage)
        } else throw new Error('The message argument must contain either text, audio or image.')
        return this
    }

    /**
     * @returns The API Client
     */
    get api(): CCatAPI | undefined {
        return this.apiClient
    }
    
    /**
     * Setter for the authentication key or token used by the client. This will also reset the client.
     * @param key The authentication key or token to be set.
     */
    set credential(key: string | undefined) {
        this.config.credential = key
        this.reset().init()
    }

    /**
     * Setter for the user ID used by the client. This will also reset the client.
     * @param user The user ID to be set.
     */
    set userId(user: string) {
        this.config.userId = user
        this.reset().init()
    }

    /**
     * Closes the WebSocket connection.
     * @returns The `CatClient` instance.
     */
    close(): CatClient {
        this.ws?.close()
        this.explicitlyClosed = true
        return this
    }

    /**
     * Returns the current state of the WebSocket connection.
     * @returns The WebSocketState enum value representing the current state of the WebSocket connection.
     */
    get socketState(): WebSocketState {
        return this.ws?.readyState ?? WebSocketState.CLOSED
    }

    /**
     * Calls the handler when the WebSocket is connected 
     * @param handler The function to call
     * @returns The current `CatClient` class instance
     */
    onConnected(handler: () => void): CatClient {
        this.connectedHandler = handler
        return this
    }

    /**
     * Calls the handler when the WebSocket is disconnected
     * @param handler The function to call
     * @returns The current `CatClient` class instance
     */
    onDisconnected(handler: () => void): CatClient {
        this.disconnectedHandler = handler
        return this
    }

    /**
     * Calls the handler when a new message arrives from the WebSocket
     * @param handler The function to call
     * @returns The current `CatClient` class instance
     */
    onMessage(handler: (data: SocketResponse) => void): CatClient {
        this.messageHandler = handler
        return this
    }

    /**
     * Calls the handler when the WebSocket catches an exception
     * @param handler The function to call
     * @returns The current `CatClient` class instance
     */
    onError(handler: (error: SocketError, event?: WebSocket.ErrorEvent) => void): CatClient {
        this.errorHandler = handler
        return this
    }
    
    private get url() {
        return `http${this.config.secure ? 's' : ''}://
            ${this.config.host}
            ${this.config.port ? `:${this.config.port}` : ''}
            `.replace(/\s/g, '')
    }
}