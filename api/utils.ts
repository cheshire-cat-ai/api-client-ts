export interface WebSocketSettings {
    path?: string
    retries?: number
    delay?: number
    onFailed?: (error: ErrorCode) => void
}

export interface CatSettings {
    baseUrl: string
    authKey?: string
    port?: string
    instant?: boolean
    secure?: boolean
    timeout?: number
    ws?: WebSocketSettings
}

export enum ErrorCode {
    IndexError,
    SocketClosed,
    WebSocketConnectionError,
    ApiError,
    FailedRetry
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