export interface WebSocketSettings {
    /** 
     * Websocket path to use to communicate with the CCat 
     * @default '/ws'
    */
    path?: string
    /** 
     * The query to append to the URL. It should start with a question mark.
     * @example '?token=123'
     * @default ''
    */
    query?: string
    /** 
     * The maximum number of retries before calling {@link WebSocketSettings.onFailed}
     * @default 3
    */
    retries?: number
    /** 
     * The delay for reconnect, in milliseconds
     * @default 5000
    */
    delay?: number
    /** 
     * The function to call after failing all the retries
     * @default undefined
    */
    onFailed?: (error: SocketError) => void
}

export interface CatSettings {
    /** The URL to which connect to the Cat 
     * @example 'localhost'
    */
    baseUrl: string
    /** 
     * The key to authenticate the Cat endpoints
     * @default ''
    */
    authKey?: string
    /** 
     * The user ID to use for Websocket connection
     * @default 'user'
    */
    user?: string
    /** 
     * The port to which connect to the Cat
     * @default 1865
    */
    port?: number
    /** 
     * Choose to either initialize the client instantly or not
     * @default true
    */
    instant?: boolean
    /** 
     * Choose to either use the secure protocol or not
     * @default false
    */
    secure?: boolean
    /** 
     * Timeout for the endpoints, in milliseconds
     * @default 10000
    */
    timeout?: number
    /** An object of type {@link WebSocketSettings} */
    ws?: WebSocketSettings
}

export const AcceptedMemoryTypes = [
    'application/json'
] as const

export type AcceptedMemoryType = typeof AcceptedMemoryTypes[number]

export const AcceptedPluginTypes = [
    'application/zip',
    'application/x-tar'
] as const

export type AcceptedPluginType = typeof AcceptedPluginTypes[number]

export enum WebSocketState {
    CONNECTING, OPEN, CLOSING, CLOSED
}

export interface SocketResponse {
    type: 'notification' | 'chat' | 'chat_token'
    content: string
    why?: unknown
}

export interface SocketError {
    name: 'SocketError' | 'FailedRetry' | 'SocketClosed'
    description: string
}

export const isMessageResponse = (value: unknown): value is SocketResponse => {
    return !!(value && typeof value === 'object' 
        && 'content' in value
        && 'type' in value
        && value.type !== 'error'
    )
}