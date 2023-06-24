/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsLargeLanguageModelService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Settings
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSettings(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/llm/',
        });
    }

    /**
     * Upsert Llm Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public upsertLlmSetting({
languageModelName,
requestBody,
}: {
languageModelName: string,
requestBody: Record<string, any>,
}): CancelablePromise<any> {
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