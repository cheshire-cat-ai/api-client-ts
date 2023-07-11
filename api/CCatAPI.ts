/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { MemoryService } from './services/MemoryService';
import { PluginsService } from './services/PluginsService';
import { RabbitHoleService } from './services/RabbitHoleService';
import { SettingsEmbedderService } from './services/SettingsEmbedderService';
import { SettingsGeneralService } from './services/SettingsGeneralService';
import { SettingsLargeLanguageModelService } from './services/SettingsLargeLanguageModelService';
import { SettingsPromptService } from './services/SettingsPromptService';
import { StatusService } from './services/StatusService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class CCatAPI {

    public readonly memory: MemoryService;
    public readonly plugins: PluginsService;
    public readonly rabbitHole: RabbitHoleService;
    public readonly settingsEmbedder: SettingsEmbedderService;
    public readonly settingsGeneral: SettingsGeneralService;
    public readonly settingsLargeLanguageModel: SettingsLargeLanguageModelService;
    public readonly settingsPrompt: SettingsPromptService;
    public readonly status: StatusService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.0.5',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.memory = new MemoryService(this.request);
        this.plugins = new PluginsService(this.request);
        this.rabbitHole = new RabbitHoleService(this.request);
        this.settingsEmbedder = new SettingsEmbedderService(this.request);
        this.settingsGeneral = new SettingsGeneralService(this.request);
        this.settingsLargeLanguageModel = new SettingsLargeLanguageModelService(this.request);
        this.settingsPrompt = new SettingsPromptService(this.request);
        this.status = new StatusService(this.request);
    }
}
