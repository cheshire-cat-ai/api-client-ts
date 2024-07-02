import { CatClient } from './api/client';

export default CatClient;

export * from './api/client';
export * from './api/utils';

export { ApiError } from './api/core/ApiError';
export { CancelablePromise, CancelError } from './api/core/CancelablePromise';

export type { AuthPermission } from './api/models/AuthPermission';
export type { AuthResource } from './api/models/AuthResource';
export type { BodyInstallPlugin } from './api/models/BodyInstallPlugin';
export type { BodyUploadFile } from './api/models/BodyUploadFile';
export type { BodyUploadMemory } from './api/models/BodyUploadMemory';
export type { BodyUploadUrl } from './api/models/BodyUploadUrl';
export type { CatMessage } from './api/models/CatMessage';
export type { Collection } from './api/models/Collection';
export type { CollectionData } from './api/models/CollectionData';
export type { CollectionsList } from './api/models/CollectionsList';
export type { ConversationMessage } from './api/models/ConversationMessage';
export type { DeleteResponse } from './api/models/DeleteResponse';
export type { FileResponse } from './api/models/FileResponse';
export type { HTTPValidationError } from './api/models/HTTPValidationError';
export type { JWTResponse } from './api/models/JWTResponse';
export type { MemoryRecall } from './api/models/MemoryRecall';
export type { MessageWhy } from './api/models/MessageWhy';
export type { Metadata } from './api/models/Metadata';
export type { Plugin } from './api/models/Plugin';
export type { PluginsList } from './api/models/PluginsList';
export type { QueryData } from './api/models/QueryData';
export type { Setting } from './api/models/Setting';
export type { SettingBody } from './api/models/SettingBody';
export type { SettingsResponse } from './api/models/SettingsResponse';
export type { Status } from './api/models/Status';
export type { UserCreate } from './api/models/UserCreate';
export type { UserCredentials } from './api/models/UserCredentials';
export type { UserResponse } from './api/models/UserResponse';
export type { UserUpdate } from './api/models/UserUpdate';
export type { VectorsData } from './api/models/VectorsData';
export type { WebResponse } from './api/models/WebResponse';