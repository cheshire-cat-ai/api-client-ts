import WebSocket from 'isomorphic-ws'
import { CCatAPI } from './CCatAPI'
import { PromptSettings } from './models/PromptSettings'
import { 
    CatSettings,
    SocketResponse, SocketError, 
    ErrorCode, 
    isMessageResponse 
} from './utils'

export class CatClient {
    private config!: CatSettings
    private apiClient!: CCatAPI
    private ws!: WebSocket
    private connectedHandler?: () => void
    private closedHandler?: () => void
    private messageHandler?: (data: SocketResponse) => void
    private errorHandler?: (error: ErrorCode, event?: WebSocket.ErrorEvent) => void
    
    constructor(settings: CatSettings) {
        this.config = {
            secure: false,
            instant: true,
            timeout: 10000,
            wsPath: 'ws',
            port: '1865',
            ...settings
        }
        if (this.config.instant) this.init()
    }

    private initWebSocket() {
        this.ws = new WebSocket(`ws${this.url}/${this.config.wsPath}`)
        this.ws.onopen = () => {
            if (this.connectedHandler) this.connectedHandler()
        }
        this.ws.onclose = () => {
            if (this.closedHandler) this.closedHandler()
        }
        this.ws.onmessage = (event) => {
            if (this.messageHandler) {
                const data = JSON.parse(event.data.toString()) as SocketError | SocketResponse
                if (isMessageResponse(data)) {
                    this.messageHandler(data)
                } else if (this.errorHandler) {
                    const errorCode = data.code as keyof typeof ErrorCode
                    const errorMessage = ErrorCode[errorCode] || ErrorCode.ApiError
                    this.errorHandler(errorMessage)
                }
            }
        }
        this.ws.onerror = (event) => {
            if (this.errorHandler) {
                this.errorHandler(ErrorCode.WebSocketConnectionError, event)
            }
        }
    }

    init() {
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

    get api() {
        return this.apiClient
    }

    close() {
        this.ws.close()
    }

    send(message: string, settings?: PromptSettings) {
        if (this.ws.readyState !== WebSocket.OPEN && this.errorHandler) {
            this.errorHandler(ErrorCode.SocketClosed)
        }
        const jsonMessage = JSON.stringify({ 
            text: message, 
            prompt_settings: settings 
        })
        this.ws.send(jsonMessage)
    }

    onConnected(handler: () => void) {
        this.connectedHandler = handler
        return this
    }

    onClosed(handler: () => void) {
        this.closedHandler = handler
        return this
    }

    onMessage(handler: (data: SocketResponse) => void) {
        this.messageHandler = handler
        return this
    }

    onError(handler: (error: ErrorCode, event?: WebSocket.ErrorEvent) => void) {
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