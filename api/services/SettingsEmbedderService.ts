/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsEmbedderService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Settings
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSettings(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/embedder/',
        });
    }

    /**
     * Upsert Embedder Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public upsertEmbedderSetting({
languageEmbedderName,
requestBody,
}: {
languageEmbedderName: string,
requestBody: Record<string, any>,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/settings/embedder/{languageEmbedderName}',
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
