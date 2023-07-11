/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationsResponse } from '../models/ConfigurationsResponse';
import type { SettingResponse } from '../models/SettingResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsLargeLanguageModelService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get LLM Settings
     * Get the list of the Large Language Models
     * @returns ConfigurationsResponse Successful Response
     * @throws ApiError
     */
    public getLlmSettings(): CancelablePromise<ConfigurationsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/llm/',
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
            url: '/settings/llm/{languageModelName}',
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
