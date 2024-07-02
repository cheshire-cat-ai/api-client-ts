/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AuthHandlerService } from './services/AuthHandlerService';
import { EmbedderService } from './services/EmbedderService';
import { LlmService } from './services/LlmService';
import { MemoryService } from './services/MemoryService';
import { PluginsService } from './services/PluginsService';
import { RabbitHoleService } from './services/RabbitHoleService';
import { SettingsService } from './services/SettingsService';
import { StatusService } from './services/StatusService';
import { UserAuthService } from './services/UserAuthService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class CCatAPI {
    public readonly authHandler: AuthHandlerService;
    public readonly embedder: EmbedderService;
    public readonly llm: LlmService;
    public readonly memory: MemoryService;
    public readonly plugins: PluginsService;
    public readonly rabbitHole: RabbitHoleService;
    public readonly settings: SettingsService;
    public readonly status: StatusService;
    public readonly userAuth: UserAuthService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.6.2',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.authHandler = new AuthHandlerService(this.request);
        this.embedder = new EmbedderService(this.request);
        this.llm = new LlmService(this.request);
        this.memory = new MemoryService(this.request);
        this.plugins = new PluginsService(this.request);
        this.rabbitHole = new RabbitHoleService(this.request);
        this.settings = new SettingsService(this.request);
        this.status = new StatusService(this.request);
        this.userAuth = new UserAuthService(this.request);
        this.users = new UsersService(this.request);
    }
}

