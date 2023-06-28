/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfigurationsResponse } from '../models/ConfigurationsResponse';
import type { SettingResponse } from '../models/SettingResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsLargeLanguageModelService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Settings
     * @returns ConfigurationsResponse Successful Response
     * @throws ApiError
     */
    public getSettings(): CancelablePromise<ConfigurationsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/llm/',
        });
    }

    /**
     * Upsert Llm Setting
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
