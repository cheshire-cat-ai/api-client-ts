export interface CatSettings {
    baseUrl: string
    authKey?: string
    port?: string
    wsPath?: string
    instant?: boolean
    secure?: boolean
    timeout?: number
}

export enum ErrorCodes {
    IndexError = 'Something went wrong while processing your message. Please try again later.',
    SocketClosed = 'The connection to the server was closed. Please try refreshing the page.',
    WebSocketConnectionError = 'Something went wrong while connecting to the server. Please try again later.',
    APIError = 'Something went wrong while sending your message. Please try refreshing the page.',
    FailedRetries = 'Failed to connect WebSocket after 3 retries.',
    AlreadyInitialized = 'The Cheshire Cat Client was already initialized'
}

export interface SocketResponse {
    error: false
    type: 'notification' | 'chat'
    content: string
    why: any
}

export interface SocketError {
    error: true
    code: string
}

export const isMessageResponse = (value: unknown): value is SocketResponse => {
    return !!(value 
        && typeof value === 'object' 
        && 'content' in value 
        && 'why' in value 
        && 'type' in value
        && 'error' in value 
        && value.error === false
    )
}