import { MessageWhy } from "./models/MessageWhy"

export interface WebSocketSettings {
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
    /** The hostname to which connect to the Cat 
     * @example 'localhost'
    */
    host: string
    /** 
     * The token or key to authenticate the Cat endpoints
     * @default undefined
    */
    credential?: string
    /** 
     * The user ID to use for Websocket connection
     * @default 'user'
    */
    userId?: string
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

export interface SocketRequest {
    text?: string
    audio?: string
    image?: string
    [key: string]: any
}

export interface SocketResponse extends SocketRequest {
    type: 'notification' | 'chat' | 'chat_token'
    user_id: string
    who: string
    why?: MessageWhy & Record<string, any>
}

export interface SocketError {
    name: 'SocketError' | 'FailedRetry' | 'SocketClosed'
    description: string
}

export const isTokenResponse = (value: unknown): value is SocketResponse => {
    return !!(value && typeof value === 'object' 
        && 'content' in value
        && 'type' in value
        && value.type !== 'error'
    )
}

export const isMessageResponse = (value: unknown): value is SocketResponse => {
    return !!(value && typeof value === 'object' 
        && ('text' in value || 'audio' in value || 'image' in value)
        && 'user_id' in value
        && 'who' in value
        && 'type' in value
        && value.type !== 'error'
    )
}