import WebSocket from 'isomorphic-ws'
import { CCatAPI } from './CCatAPI'
import { 
    SocketResponse, SocketError, WebSocketState,
    WebSocketSettings,
    isMessageResponse,
    CatSettings,
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
            ...settings
        }
        if (this.config.instant) this.init()
    }

    private initWebSocket() {
        const socketSettings = {
            delay: 3000,
            path: 'ws',
            retries: 3,
            ...this.config.ws
        } satisfies WebSocketSettings
        this.ws = new WebSocket(`ws${this.url}/${socketSettings.path}`)
        this.ws.onopen = () => {
            this.connectedHandler?.()
        }
        this.ws.onclose = () => {
            if (!this.explicitlyClosed) {
                this.retried += 1
                if (socketSettings.retries < 0 || this.retried < socketSettings.retries) {
                    setTimeout(() => this.initWebSocket(), socketSettings.delay)
                } else socketSettings.onFailed?.({
                    name: 'FailedRetry',
                    description: `Failed to connect WebSocket after ${socketSettings.retries} retries.`
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
            }
            this.errorHandler?.(data)
        }
        this.ws.onerror = (event) => {
            this.errorHandler?.({
                name: 'WebSocketConnectionError',
                description: 'Something went wrong while connecting to the server'
            }, event)
        }
    }

    reset(): CatClient {
        this.retried = 0
        this.close()
        this.ws = undefined
        this.apiClient = undefined
        return this
    }

    /**
     * Initialize the WebSocket and the API Client
     * @throws An error saying that the client was already initialized
     * @returns the current {@link CatClient} class instance
     */
    init(): CatClient {
        if (!this.ws && !this.apiClient) {
            this.initWebSocket()
            this.apiClient = new CCatAPI({
                BASE: `http${this.url}`,
                HEADERS: {
                    'access_token': this.config.authKey ?? '',
                }
            })
            return this
        } else throw new Error("The Cheshire Cat Client was already initialized")
    }

    /**
     * @returns The API Client
     */
    get api(): CCatAPI | undefined {
        return this.apiClient
    }

    /**
     * Changes the authentication key at runtime
     */
    set authKey(key: string) {
        this.config.authKey = key
        this.reset().init()
    }

    /**
     * Closes the WebSocket connection
     */
    close(): CatClient {
        this.ws?.close()
        this.explicitlyClosed = true
        return this
    }

    /**
     * Get the state of the WebSocket
     */
    get readyState(): WebSocketState {
        return this.ws?.readyState ?? WebSocketState.CLOSED
    }

    /**
     * Sends a message via WebSocket to the Cat
     * @param message The message to pass
     * @param userId The user ID to pass
     */
    send(message: string, userId = "user"): CatClient {
        if (this.ws?.readyState !== WebSocket.OPEN) {
            this.errorHandler?.({
                name: 'SocketClosed',
                description: 'The connection to the server was closed'
            })
            return this
        }
        const jsonMessage = JSON.stringify({ 
            text: message,
            user_id: userId
        })
        this.ws?.send(jsonMessage)
        return this
    }

    /**
     * Calls the handler when the WebSocket is connected 
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onConnected(handler: () => void): CatClient {
        this.connectedHandler = handler
        return this
    }

    /**
     * Calls the handler when the WebSocket is disconnected
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onDisconnected(handler: () => void): CatClient {
        this.disconnectedHandler = handler
        return this
    }

    /**
     * Calls the handler when a new message arrives from the WebSocket
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onMessage(handler: (data: SocketResponse) => void): CatClient {
        this.messageHandler = handler
        return this
    }

    /**
     * Calls the handler when the WebSocket catches an exception
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onError(handler: (error: SocketError, event?: WebSocket.ErrorEvent) => void): CatClient {
        this.errorHandler = handler
        return this
    }
    
    private get url() {
        return `${this.config.secure ? 's' : ''}://
            ${this.config.baseUrl}
            ${this.config.port ? `:${this.config.port}` : ''}
            `.replace(/\s/g, '')
    }
}