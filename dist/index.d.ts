import WebSocket from 'isomorphic-ws';

type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, any>;
    readonly cookies?: Record<string, any>;
    readonly headers?: Record<string, any>;
    readonly query?: Record<string, any>;
    readonly formData?: Record<string, any>;
    readonly body?: any;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};

declare class CancelError extends Error {
    constructor(message: string);
    get isCancelled(): boolean;
}
interface OnCancel {
    readonly isResolved: boolean;
    readonly isRejected: boolean;
    readonly isCancelled: boolean;
    (cancelHandler: () => void): void;
}
declare class CancelablePromise<T> implements Promise<T> {
    #private;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, onCancel: OnCancel) => void);
    get [Symbol.toStringTag](): string;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null): Promise<T>;
    cancel(): void;
    get isCancelled(): boolean;
}

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;
type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string> | undefined;
    USERNAME?: string | Resolver<string> | undefined;
    PASSWORD?: string | Resolver<string> | undefined;
    HEADERS?: Headers | Resolver<Headers> | undefined;
    ENCODE_PATH?: ((path: string) => string) | undefined;
};

declare abstract class BaseHttpRequest {
    readonly config: OpenAPIConfig;
    constructor(config: OpenAPIConfig);
    abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}

type JsonSchema = {
    title: string;
    type: string;
    description?: string;
    properties: Record<string, any>;
    required: Array<string>;
    additionalProperties?: (boolean | Record<string, any>);
    definitions?: Record<string, any>;
    humanReadableName?: string;
    link?: string;
};

type Setting = {
    name: string;
    value: Record<string, any>;
    schema?: JsonSchema;
};

type SettingsResponse = {
    settings: Array<Setting>;
    selected_configuration?: string;
};

declare class EmbedderService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get Embedders Settings
     * Get the list of the Embedders
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    getEmbeddersSettings(): CancelablePromise<SettingsResponse>;
    /**
     * Get Embedder Settings
     * Get settings and schema of the specified Embedder
     * @param languageEmbedderName
     * @returns Setting Successful Response
     * @throws ApiError
     */
    getEmbedderSettings(languageEmbedderName: string): CancelablePromise<Setting>;
    /**
     * Upsert Embedder Setting
     * Upsert the Embedder setting
     * @param languageEmbedderName
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    upsertEmbedderSetting(languageEmbedderName: string, requestBody: Record<string, any>): CancelablePromise<Setting>;
}

declare class LargeLanguageModelService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get LLMs Settings
     * Get the list of the Large Language Models
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    getLlmsSettings(): CancelablePromise<SettingsResponse>;
    /**
     * Get Llm Settings
     * Get settings and schema of the specified Large Language Model
     * @param languageModelName
     * @returns Setting Successful Response
     * @throws ApiError
     */
    getLlmSettings(languageModelName: string): CancelablePromise<Setting>;
    /**
     * Upsert LLM Setting
     * Upsert the Large Language Model setting
     * @param languageModelName
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    upsertLlmSetting(languageModelName: string, requestBody: Record<string, any>): CancelablePromise<Setting>;
}

type Collection = {
    name: string;
    vectors_count: number;
};

type CollectionsList = {
    collections: Array<Collection>;
};

type DeleteResponse = {
    deleted: (string | boolean | Record<string, any>);
};

type QueryData = {
    text: string;
    vector: Array<number>;
};

type MetaData = {
    source: string;
    when: number;
    docstring?: string;
    name?: string;
};

type CollectionData = {
    page_content: string;
    metadata: MetaData;
    id: string;
    score: number;
    vector: Array<number>;
};

type VectorsData = {
    embedder: string;
    collections: Record<string, Array<CollectionData>>;
};

type MemoryRecall = {
    query: QueryData;
    vectors: VectorsData;
};

declare class MemoryService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Recall Memories From Text
     * Search k memories similar to given text.
     * @param text Find memories similar to this text.
     * @param k How many memories to return.
     * @param userId User id.
     * @returns MemoryRecall Successful Response
     * @throws ApiError
     */
    recallMemoriesFromText(text: string, k?: number, userId?: string): CancelablePromise<MemoryRecall>;
    /**
     * Get Collections
     * Get list of available collections
     * @returns CollectionsList Successful Response
     * @throws ApiError
     */
    getCollections(): CancelablePromise<CollectionsList>;
    /**
     * Wipe Collections
     * Delete and create all collections
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    wipeCollections(): CancelablePromise<DeleteResponse>;
    /**
     * Wipe Single Collection
     * Delete and recreate a collection
     * @param collectionId
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    wipeSingleCollection(collectionId: string): CancelablePromise<DeleteResponse>;
    /**
     * Delete Element In Memory
     * Delete specific element in memory.
     * @param collectionId
     * @param memoryId
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    deleteElementInMemory(collectionId: string, memoryId: string): CancelablePromise<DeleteResponse>;
    /**
     * Wipe Conversation History
     * Delete conversation history from working memory
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    wipeConversationHistory(): CancelablePromise<DeleteResponse>;
}

type BodyInstallPlugin = {
    file: Blob;
};

type BodyUploadUrl = {
    /**
     * URL of the website to which you want to save the content
     */
    url: string;
    /**
     * Maximum length of each chunk after the document is split (in characters)
     */
    chunk_size?: number;
    /**
     * Chunk overlap (in characters)
     */
    chunk_overlap?: number;
};

type FileResponse = {
    filename: string;
    content_type: string;
    info: string;
};

type Plugin = {
    id: string;
    name: string;
    description: string;
    author_name: string;
    author_url: string;
    plugin_url: string;
    tags: string;
    thumb: string;
    version: string;
    active?: boolean;
    url?: string;
};

type PluginsList = {
    filters: {
        query?: string;
    };
    installed: Array<Plugin>;
    registry: Array<Plugin>;
};

declare class PluginsService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * List Available Plugins
     * List both installed and registry plugins
     * @param query
     * @returns PluginsList Successful Response
     * @throws ApiError
     */
    listAvailablePlugins(query?: string): CancelablePromise<PluginsList>;
    /**
     * Install Plugin
     * Install a new plugin from a zip file
     * @param formData
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    installPlugin(formData: BodyInstallPlugin): CancelablePromise<FileResponse>;
    /**
     * Install Plugin From Registry
     * Install a new plugin from external repository
     * @param formData
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    installPluginFromRegistry(formData: BodyUploadUrl): CancelablePromise<FileResponse>;
    /**
     * Toggle Plugin
     * Enable or disable a single plugin
     * @param pluginId
     * @returns any Successful Response
     * @throws ApiError
     */
    togglePlugin(pluginId: string): CancelablePromise<{
        info: string;
    }>;
    /**
     * Get Plugin Details
     * Returns information on a single plugin
     * @param pluginId
     * @returns Plugin Successful Response
     * @throws ApiError
     */
    getPluginDetails(pluginId: string): CancelablePromise<Plugin>;
    /**
     * Delete Plugin
     * Physically remove a plugin
     * @param pluginId
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    deletePlugin(pluginId: string): CancelablePromise<DeleteResponse>;
    /**
     * Get Plugins Settings
     * Returns the settings of all the plugins
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    getPluginsSettings(): CancelablePromise<SettingsResponse>;
    /**
     * Get Plugin Settings
     * Returns the settings of a specific plugin
     * @param pluginId
     * @returns any Successful Response
     * @throws ApiError
     */
    getPluginSettings(pluginId: string): CancelablePromise<(Setting & {
        schema: JsonSchema;
    })>;
    /**
     * Upsert Plugin Settings
     * Updates the settings of a specific plugin
     * @param pluginId
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    upsertPluginSettings(pluginId: string, requestBody: Record<string, any>): CancelablePromise<Setting>;
}

type DefaultPromptSettings = {
    prefix: string;
    use_episodic_memory: boolean;
    use_declarative_memory: boolean;
    use_procedural_memory: boolean;
};

declare class PromptService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get Default Prompt Settings
     * @returns DefaultPromptSettings Successful Response
     * @throws ApiError
     */
    getDefaultPromptSettings(): CancelablePromise<DefaultPromptSettings>;
}

type BodyUploadFile = {
    file: Blob;
    /**
     * Maximum length of each chunk after the document is split (in characters)
     */
    chunk_size?: number;
    /**
     * Chunk overlap (in characters)
     */
    chunk_overlap?: number;
};

type BodyUploadMemory = {
    file: Blob;
};

type WebResponse = {
    url: string;
    info: string;
};

declare class RabbitHoleService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Upload File
     * Upload a file containing text (.txt, .md, .pdf, etc.). File content will be extracted and segmented into chunks.
 * Chunks will be then vectorized and stored into documents memory.
     * @param formData
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    uploadFile(formData: BodyUploadFile): CancelablePromise<FileResponse>;
    /**
     * Upload URL
     * Upload a URL. Website content will be extracted and segmented into chunks.
 * Chunks will be then vectorized and stored into documents memory.
     * @param requestBody
     * @returns WebResponse Successful Response
     * @throws ApiError
     */
    uploadUrl(requestBody: BodyUploadUrl): CancelablePromise<WebResponse>;
    /**
     * Upload Memory
     * Upload a memory json file to the cat memory
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    uploadMemory(formData: BodyUploadMemory): CancelablePromise<Record<string, any>>;
    /**
     * Get Allowed Mimetypes
     * Retrieve the allowed mimetypes that can be ingested by the Rabbit Hole
     * @returns any Successful Response
     * @throws ApiError
     */
    getAllowedMimetypes(): CancelablePromise<{
        allowed?: Array<string>;
    }>;
}

type SettingBody = {
    name: string;
    value: Record<string, any>;
    category?: string;
};

declare class SettingsService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Get Settings
     * Get the entire list of settings available in the database
     * @param search The setting to search
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    getSettings(search?: string): CancelablePromise<SettingsResponse>;
    /**
     * Create Setting
     * Create a new setting in the database
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    createSetting(requestBody: SettingBody): CancelablePromise<Setting>;
    /**
     * Get Setting
     * Get the a specific setting from the database
     * @param settingId
     * @returns Setting Successful Response
     * @throws ApiError
     */
    getSetting(settingId: string): CancelablePromise<Setting>;
    /**
     * Delete Setting
     * Delete a specific setting in the database
     * @param settingId
     * @returns any Successful Response
     * @throws ApiError
     */
    deleteSetting(settingId: string): CancelablePromise<any>;
    /**
     * Update Setting
     * Update a specific setting in the database if it exists
     * @param settingId
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    updateSetting(settingId: string, requestBody: SettingBody): CancelablePromise<Setting>;
}

type Status = {
    status: string;
    version: string;
};

declare class StatusService {
    private readonly httpRequest;
    constructor(httpRequest: BaseHttpRequest);
    /**
     * Home
     * Server status
     * @returns Status Successful Response
     * @throws ApiError
     */
    home(): CancelablePromise<Status>;
}

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
declare class CCatAPI {
    readonly embedder: EmbedderService;
    readonly largeLanguageModel: LargeLanguageModelService;
    readonly memory: MemoryService;
    readonly plugins: PluginsService;
    readonly prompt: PromptService;
    readonly rabbitHole: RabbitHoleService;
    readonly settings: SettingsService;
    readonly status: StatusService;
    readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest?: HttpRequestConstructor);
}

type PromptSettings<TSettings = unknown> = DefaultPromptSettings & Record<string, TSettings>;
interface WebSocketSettings {
    /**
     * Websocket path to use to communicate with the CCat
     * @default 'ws'
    */
    path?: string;
    /**
     * The maximum number of retries before calling {@link WebSocketSettings.onFailed}
     * @default 3
    */
    retries?: number;
    /**
     * The delay for reconnect, in milliseconds
     * @default 5000
    */
    delay?: number;
    /**
     * The function to call after failing all the retries
     * @default undefined
    */
    onFailed?: (error: SocketError) => void;
}
interface CatSettings {
    /** The URL to which connect to the Cat */
    baseUrl: string;
    /**
     * The key to authenticate the Cat endpoints
     * @default ''
    */
    authKey?: string;
    /**
     * The port to which connect to the Cat
     * @default 1865
    */
    port?: number;
    /**
     * Choose to either initialize the client instantly or not
     * @default true
    */
    instant?: boolean;
    /**
     * Choose to either use the secure protocol or not
     * @default false
    */
    secure?: boolean;
    /**
     * Timeout for the endpoints, in milliseconds
     * @default 10000
    */
    timeout?: number;
    /** An object of type {@link WebSocketSettings} */
    ws?: WebSocketSettings;
}
declare const AcceptedMemoryTypes: readonly ["application/json"];
type AcceptedMemoryType = typeof AcceptedMemoryTypes[number];
declare const AcceptedPluginTypes: readonly ["application/zip", "application/x-tar"];
type AcceptedPluginType = typeof AcceptedPluginTypes[number];
declare enum WebSocketState {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3
}
interface SocketResponse {
    type: 'notification' | 'chat';
    content: string;
    why?: unknown;
}
interface SocketError {
    name: string;
    description: string;
}
declare const isMessageResponse: (value: unknown) => value is SocketResponse;

/**
 * The class to communicate with the Cheshire Cat AI
 */
declare class CatClient {
    private config;
    private apiClient;
    private ws;
    private connectedHandler?;
    private disconnectedHandler?;
    private messageHandler?;
    private errorHandler?;
    private explicitlyClosed;
    private retried;
    /**
     * Initialize the class with the specified settings
     * @param settings The settings to pass
     */
    constructor(settings: CatSettings);
    private initWebSocket;
    reset(): CatClient;
    /**
     * Initialize the WebSocket and the API Client
     * @throws An error saying that the client was already initialized
     * @returns the current {@link CatClient} class instance
     */
    init(): CatClient;
    /**
     * @returns The API Client
     */
    get api(): CCatAPI | undefined;
    /**
     * Changes the authentication key at runtime
     */
    set authKey(key: string);
    /**
     * Closes the WebSocket connection
     */
    close(): CatClient;
    /**
     * Get the state of the WebSocket
     */
    get readyState(): WebSocketState;
    /**
     * Sends a message via WebSocket to the Cat
     * @param message The message to pass
     * @param userId The user ID to pass
     * @param settings The prompt settings to pass
     */
    send(message: string, userId?: string, settings?: Partial<PromptSettings>): CatClient;
    /**
     * Calls the handler when the WebSocket is connected
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onConnected(handler: () => void): CatClient;
    /**
     * Calls the handler when the WebSocket is disconnected
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onDisconnected(handler: () => void): CatClient;
    /**
     * Calls the handler when a new message arrives from the WebSocket
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onMessage(handler: (data: SocketResponse) => void): CatClient;
    /**
     * Calls the handler when the WebSocket catches an exception
     * @param handler The function to call
     * @returns the current {@link CatClient} class instance
     */
    onError(handler: (error: SocketError, event?: WebSocket.ErrorEvent) => void): CatClient;
    private get url();
}

type ApiResult = {
    readonly url: string;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
};

declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    readonly request: ApiRequestOptions;
    constructor(request: ApiRequestOptions, response: ApiResult, message: string);
}

type HTTPValidationError = {
    detail?: {
        error: string;
    };
};

export { AcceptedMemoryType, AcceptedMemoryTypes, AcceptedPluginType, AcceptedPluginTypes, ApiError, BodyInstallPlugin, BodyUploadFile, BodyUploadMemory, BodyUploadUrl, CancelError, CancelablePromise, CatClient, CatSettings, Collection, CollectionData, CollectionsList, DefaultPromptSettings, DeleteResponse, FileResponse, HTTPValidationError, JsonSchema, MemoryRecall, MetaData, Plugin, PluginsList, PromptSettings, QueryData, Setting, SettingBody, SettingsResponse, SocketError, SocketResponse, Status, VectorsData, WebResponse, WebSocketSettings, WebSocketState, CatClient as default, isMessageResponse };
