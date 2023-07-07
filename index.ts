import { CatClient } from './api/client';

export default CatClient;

export * from './api/client';
export * from './api/utils';

export { CancelablePromise, CancelError } from './api/core/CancelablePromise';
export { ApiError } from './api/core/ApiError';

export type { BodyUploadFile } from './api/models/BodyUploadFile';
export type { BodyUploadMemory } from './api/models/BodyUploadMemory';
export type { BodyUploadPlugin } from './api/models/BodyUploadPlugin';
export type { BodyUploadUrl } from './api/models/BodyUploadUrl';
export type { Collection } from './api/models/Collection';
export type { CollectionData } from './api/models/CollectionData';
export type { CollectionsList } from './api/models/CollectionsList';
export type { ConfigurationsResponse } from './api/models/ConfigurationsResponse';
export type { DeleteResponse } from './api/models/DeleteResponse';
export type { FileResponse } from './api/models/FileResponse';
export type { HTTPValidationError } from './api/models/HTTPValidationError';
export type { MemoryRecall } from './api/models/MemoryRecall';
export type { MetaData } from './api/models/MetaData';
export type { Plugin } from './api/models/Plugin';
export type { PluginResponse } from './api/models/PluginResponse';
export type { PluginsList } from './api/models/PluginsList';
export type { PromptSettings as DefaultPromptSettings } from './api/models/PromptSettings';
export type { QueryData } from './api/models/QueryData';
export type { Schema } from './api/models/Schema';
export type { Setting } from './api/models/Setting';
export type { SettingResponse } from './api/models/SettingResponse';
export type { SettingsList } from './api/models/SettingsList';
export type { Status } from './api/models/Status';
export type { ValidationError } from './api/models/ValidationError';
export type { VectorsData } from './api/models/VectorsData';
export type { WebResponse } from './api/models/WebResponse';