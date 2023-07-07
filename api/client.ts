import WebSocket from 'isomorphic-ws'
import { CCatAPI } from './CCatAPI'
import { 
    SocketResponse, SocketError, WebSocketState,
    WebSocketSettings, PromptSettings,
    isMessageResponse,
    CatSettings,
    ErrorCode, 
} from './utils'

/**
 * The class to communicate with the Cheshire Cat AI
 */
export class CatClient {
    private config!: CatSettings
    private apiClient!: CCatAPI
    private ws!: WebSocket
    private connectedHandler?: () => void
    private disconnectedHandler?: () => void
    private messageHandler?: (data: SocketResponse) => void
    private errorHandler?: (error: ErrorCode, event?: WebSocket.ErrorEvent) => void
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
            port: '1865',
            ...settings
        }
        if (this.config.instant) this.init()
    }

    private initWebSocket() {
        const socketSettings = {
            delay: 5000,
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
                } else socketSettings.onFailed?.(ErrorCode.FailedRetry)
            }
            this.disconnectedHandler?.()
        }
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data.toString()) as SocketError | SocketResponse
            if (isMessageResponse(data)) {
                this.messageHandler?.(data)
                return
            }
            const errorCode = data.code as keyof typeof ErrorCode
            const errorMessage = ErrorCode[errorCode] || ErrorCode.ApiError
            this.errorHandler?.(errorMessage)
        }
        this.ws.onerror = (event) => {
            this.errorHandler?.(ErrorCode.WebSocketConnectionError, event)
        }
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
    get api(): CCatAPI {
        return this.apiClient
    }

    /**
     * Changes the authentication key at runtime
     */
    set authKey(key: string) {
        this.config.authKey = key
    }

    /**
     * Closes the WebSocket connection
     */
    close() {
        this.ws.close()
        this.explicitlyClosed = true
    }

    /**
     * Get the state of the WebSocket
     */
    get readyState(): WebSocketState {
        return this.ws.readyState
    }

    /**
     * Sends a message via WebSocket to the Cat
     * @param message The message to pass
     * @param settings The prompt settings to pass
     */
    send(message: string, settings?: Partial<PromptSettings>) {
        if (this.ws.readyState !== WebSocket.OPEN) {
            this.errorHandler?.(ErrorCode.SocketClosed)
        }
        const jsonMessage = JSON.stringify({ 
            text: message, 
            prompt_settings: settings 
        })
        this.ws.send(jsonMessage)
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
    onError(handler: (error: ErrorCode, event?: WebSocket.ErrorEvent) => void): CatClient {
        this.errorHandler = handler
        return this
    }
    
    private get url() {
        return `${this.config.secure ? 's://' : '://'}
            ${this.config.baseUrl}
            ${this.config.port ? `:${this.config.port}` : ''}
            `.replace(/\s/g, '')
    }
}