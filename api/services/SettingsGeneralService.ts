/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Setting } from '../models/Setting';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsGeneralService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Settings
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSettings({
limit = 100,
page = 1,
search = '',
}: {
limit?: number,
page?: number,
search?: string,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/',
            query: {
                'limit': limit,
                'page': page,
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public createSetting({
requestBody,
}: {
requestBody: Setting,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public getSetting({
settingId,
}: {
settingId: string,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/{settingId}',
            path: {
                'settingId': settingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteSetting({
settingId,
}: {
settingId: string,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/settings/{settingId}',
            path: {
                'settingId': settingId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Setting
     * @returns any Successful Response
     * @throws ApiError
     */
    public updateSetting({
settingId,
requestBody,
}: {
settingId: string,
requestBody: Setting,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/settings/{settingId}',
            path: {
                'settingId': settingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
