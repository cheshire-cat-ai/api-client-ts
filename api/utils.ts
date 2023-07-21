import { DefaultPromptSettings } from './models/DefaultPromptSettings'

export type PromptSettings = DefaultPromptSettings & Record<string, any>

export interface WebSocketSettings {
    /** 
     * Websocket path to use to communicate with the CCat 
     * @default 'ws'
    */
    path?: string
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
    /** The URL to which connect to the Cat */
    baseUrl: string
    /** 
     * The key to authenticate the Cat endpoints
     * @default ''
    */
    authKey?: string
    /** 
     * The port to which connect to the Cat
     * @default '1865'
    */
    port?: string
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

export const AcceptedFileTypes = [
    'text/plain', 
    'text/markdown', 
    'application/pdf'
] as const

export type AcceptedFileType = typeof AcceptedFileTypes[number]

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
    type: 'notification' | 'chat'
    content: string
    why?: unknown
}

export interface SocketError {
    name: string
    description: string
}

export const isMessageResponse = (value: unknown): value is SocketResponse => {
    return !!(value && typeof value === 'object' 
        && 'content' in value
        && 'type' in value
        && value.type !== 'error'
    )
}