/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonSchema } from '../models/JsonSchema';
import type { ModelsResponse } from '../models/ModelsResponse';
import type { SettingResponse } from '../models/SettingResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EmbedderService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Embedders Settings
     * Get the list of the Embedders
     * @returns ModelsResponse Successful Response
     * @throws ApiError
     */
    public getEmbeddersSettings(): CancelablePromise<ModelsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/embedder/settings/',
        });
    }

    /**
     * Get Embedder Settings
     * Get settings and schema of the specified Embedder
     * @param languageEmbedderName 
     * @returns any Successful Response
     * @throws ApiError
     */
    public getEmbedderSettings(
languageEmbedderName: string,
): CancelablePromise<(SettingResponse & {
schema: (JsonSchema & {
nameHumanReadable?: string;
});
})> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/embedder/settings/{languageEmbedderName}/',
            path: {
                'languageEmbedderName': languageEmbedderName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upsert Embedder Setting
     * Upsert the Embedder setting
     * @param languageEmbedderName 
     * @param requestBody 
     * @returns SettingResponse Successful Response
     * @throws ApiError
     */
    public upsertEmbedderSetting(
languageEmbedderName: string,
requestBody: Record<string, any>,
): CancelablePromise<SettingResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/embedder/settings/{languageEmbedderName}/',
            path: {
                'languageEmbedderName': languageEmbedderName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
