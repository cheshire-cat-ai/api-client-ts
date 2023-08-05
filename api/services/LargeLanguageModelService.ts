/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JsonSchema } from '../models/JsonSchema';
import type { ModelsResponse } from '../models/ModelsResponse';
import type { SettingResponse } from '../models/SettingResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LargeLanguageModelService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get LLMs Settings
     * Get the list of the Large Language Models
     * @returns ModelsResponse Successful Response
     * @throws ApiError
     */
    public getLlmsSettings(): CancelablePromise<ModelsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/llm/settings/',
        });
    }

    /**
     * Get Llm Settings
     * Get settings and schema of the specified Large Language Model
     * @param languageModelName 
     * @returns any Successful Response
     * @throws ApiError
     */
    public getLlmSettings(
languageModelName: string,
): CancelablePromise<(SettingResponse & {
schema: (JsonSchema & {
nameHumanReadable?: string;
});
})> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/llm/settings/{languageModelName}/',
            path: {
                'languageModelName': languageModelName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upsert LLM Setting
     * Upsert the Large Language Model setting
     * @param languageModelName 
     * @param requestBody 
     * @returns SettingResponse Successful Response
     * @throws ApiError
     */
    public upsertLlmSetting(
languageModelName: string,
requestBody: Record<string, any>,
): CancelablePromise<SettingResponse> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/llm/settings/{languageModelName}/',
            path: {
                'languageModelName': languageModelName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
