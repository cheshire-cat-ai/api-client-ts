import { CatClient } from './api/client';

export default CatClient;

export * from './api/client';
export * from './api/utils';

export { ApiError } from './api/core/ApiError';
export { CancelablePromise, CancelError } from './api/core/CancelablePromise';

export type { BodyInstallPlugin } from './api/models/BodyInstallPlugin';
export type { BodyUploadFile } from './api/models/BodyUploadFile';
export type { BodyUploadMemory } from './api/models/BodyUploadMemory';
export type { BodyUploadUrl } from './api/models/BodyUploadUrl';
export type { Collection } from './api/models/Collection';
export type { CollectionData } from './api/models/CollectionData';
export type { CollectionsList } from './api/models/CollectionsList';
export type { DefaultPromptSettings } from './api/models/DefaultPromptSettings';
export type { DeleteResponse } from './api/models/DeleteResponse';
export type { FileResponse } from './api/models/FileResponse';
export type { HTTPValidationError } from './api/models/HTTPValidationError';
export type { JsonSchema } from './api/models/JsonSchema';
export type { MemoryRecall } from './api/models/MemoryRecall';
export type { MetaData } from './api/models/MetaData';
export type { ModelsResponse } from './api/models/ModelsResponse';
export type { Plugin } from './api/models/Plugin';
export type { PluginsList } from './api/models/PluginsList';
export type { PluginsSettingsResponse } from './api/models/PluginsSettingsResponse';
export type { QueryData } from './api/models/QueryData';
export type { SettingBody } from './api/models/SettingBody';
export type { SettingResponse } from './api/models/SettingResponse';
export type { SettingsList } from './api/models/SettingsList';
export type { Status } from './api/models/Status';
export type { VectorsData } from './api/models/VectorsData';
export type { WebResponse } from './api/models/WebResponse';