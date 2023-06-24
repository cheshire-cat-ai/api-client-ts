import WebSocket from 'isomorphic-ws'
import { CCatAPI } from './CCatAPI'

interface CatSettings {
    authKey: string
    baseUrl: string
    port?: string
    wsPath?: string
    instant?: boolean
    secure?: boolean
    timeout?: number
}

enum ErrorCodes {
    IndexError = 'Something went wrong while processing your message. Please try again later.',
    SocketClosed = 'The connection to the server was closed. Please try refreshing the page.',
    WebSocketConnectionError = 'Something went wrong while connecting to the server. Please try again later.',
    APIError = 'Something went wrong while sending your message. Please try refreshing the page.',
    FailedRetries = 'Failed to connect WebSocket after 3 retries.',
    AlreadyInitialized = 'The Cheshire Cat Client was already initialized'
}

interface MessageResponse {
    error: false
    type: 'notification' | 'chat'
    content: string
    why: any
}

interface MessageError {
    error: true
    code: string
}

type PromptSettings = {
    prefix: string
} & {
    [key: string]: boolean
}

const isMessageResponse = (value: unknown): value is MessageResponse => {
    return !!(value && typeof value === 'object' && 'content' in value && 'why' in value && 'error' in value && value.error === false)
}

export class CatClient {
    private config!: CatSettings
    private apiClient!: CCatAPI
    private ws!: WebSocket
    private connectedHandler?: () => void
    private closedHandler?: () => void
    private messageHandler?: (data: Omit<MessageResponse, 'error'>) => void
    private errorHandler?: (error: Error) => void
    
    constructor(settings: CatSettings) {
        this.config = {
            secure: false,
            instant: true,
            timeout: 10000,
            wsPath: 'ws',
            port: '',
            ...settings
        }
        if (this.config.instant) this.init()
    }

    init() {
        if (!this.ws && !this.apiClient) {
            this.ws = new WebSocket(`ws${this.url}/${this.config.wsPath}`)
            this.ws.onopen = () => {
                if (this.connectedHandler) this.connectedHandler()
            }
            this.ws.onclose = () => {
                if (this.closedHandler) this.closedHandler()
            }
            this.ws.onmessage = (event: MessageEvent<string>) => {
                if (this.messageHandler) {
                    const data = JSON.parse(event.data) as MessageError | MessageResponse
                    if (isMessageResponse(data)) {
                        const { content, type, why } = data
                        this.messageHandler({ content, type, why})
                        return
                    }
                    if (this.errorHandler) {
                        const errorCode = data.code as keyof typeof ErrorCodes
                        const errorMessage = ErrorCodes[errorCode] || ErrorCodes.APIError
                        this.errorHandler(new Error(errorMessage))
                    }
                }
            }
            this.ws.onerror = (event: Event) => {
                if (this.errorHandler) {
                    this.errorHandler(new Error(ErrorCodes.WebSocketConnectionError))
                }
            }
            this.apiClient = new CCatAPI({
                BASE: `http${this.url}`,
                HEADERS: {
                    'access_token': this.config.authKey,
                }
            })
        } else throw new Error(ErrorCodes.AlreadyInitialized)
    }

    get api() {
        return this.apiClient
    }

    close() {
        this.ws.close()
    }

    send(message: string, settings?: PromptSettings) {
        if (this.ws.readyState !== 1) {
            const error = new Error(ErrorCodes.SocketClosed)
            if (this.errorHandler) this.errorHandler(error)
            else throw error
        }
        const jsonMessage = JSON.stringify({ 
            text: message, 
            prompt_settings: settings 
        })
        this.ws.send(jsonMessage)
    }

    onConnected(handler: typeof this.connectedHandler) {
        this.connectedHandler = handler
        return this
    }

    onClosed(handler: typeof this.closedHandler) {
        this.closedHandler = handler
        return this
    }

    onMessage(handler: typeof this.messageHandler) {
        this.messageHandler = handler
        return this
    }

    onError(handler: typeof this.errorHandler) {
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