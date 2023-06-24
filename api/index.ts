/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { CCatAPI } from './CCatAPI';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { Body_install_plugin } from './models/Body_install_plugin';
export type { Body_upload_file } from './models/Body_upload_file';
export type { Body_upload_memory } from './models/Body_upload_memory';
export type { Body_upload_url } from './models/Body_upload_url';
export type { Collection } from './models/Collection';
export type { CollectionData } from './models/CollectionData';
export type { CollectionsList } from './models/CollectionsList';
export type { FileResponse } from './models/FileResponse';
export type { HTTPValidationError } from './models/HTTPValidationError';
export type { MemoryRecall } from './models/MemoryRecall';
export type { MetaData } from './models/MetaData';
export type { Plugin } from './models/Plugin';
export type { PluginsList } from './models/PluginsList';
export type { PromptSettings } from './models/PromptSettings';
export type { QueryData } from './models/QueryData';
export type { Setting } from './models/Setting';
export type { ValidationError } from './models/ValidationError';
export type { VectorsData } from './models/VectorsData';
export type { WebResponse } from './models/WebResponse';
export type { WipedConversation } from './models/WipedConversation';

export { DefaultService } from './services/DefaultService';
export { MemoryService } from './services/MemoryService';
export { PluginsService } from './services/PluginsService';
export { RabbitHoleService } from './services/RabbitHoleService';
export { SettingsEmbedderService } from './services/SettingsEmbedderService';
export { SettingsGeneralService } from './services/SettingsGeneralService';
export { SettingsLargeLanguageModelService } from './services/SettingsLargeLanguageModelService';
export { SettingsPromptService } from './services/SettingsPromptService';
export { StatusService } from './services/StatusService';
