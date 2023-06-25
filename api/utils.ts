export interface CatSettings {
    baseUrl: string
    authKey?: string
    port?: string
    wsPath?: string
    instant?: boolean
    secure?: boolean
    timeout?: number
}

export enum ErrorCode {
    IndexError,
    SocketClosed,
    WebSocketConnectionError,
    ApiError,
    FailedRetries
}

export interface SocketResponse {
    error: false
    type: 'notification' | 'chat'
    content: string
    why: unknown
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