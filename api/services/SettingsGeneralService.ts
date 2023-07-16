/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Setting } from '../models/Setting';
import type { SettingResponse } from '../models/SettingResponse';
import type { SettingsList } from '../models/SettingsList';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsGeneralService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Settings
     * Get the entire list of settings available in the database
     * @param search The setting to search
     * @returns SettingsList Successful Response
     * @throws ApiError
     */
    public getSettings(
search: string = '',
): CancelablePromise<SettingsList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/',
            query: {
                'search': search,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Setting
     * Create a new setting in the database
     * @param requestBody 
     * @returns SettingResponse Successful Response
     * @throws ApiError
     */
    public createSetting(
requestBody: Setting,
): CancelablePromise<SettingResponse> {
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
     * Get the a specific setting from the database
     * @param settingId 
     * @returns SettingResponse Successful Response
     * @throws ApiError
     */
    public getSetting(
settingId: string,
): CancelablePromise<SettingResponse> {
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
     * Delete a specific setting in the database
     * @param settingId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteSetting(
settingId: string,
): CancelablePromise<any> {
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
     * Update a specific setting in the database if it exists
     * @param settingId 
     * @param requestBody 
     * @returns SettingResponse Successful Response
     * @throws ApiError
     */
    public updateSetting(
settingId: string,
requestBody: Setting,
): CancelablePromise<SettingResponse> {
        return this.httpRequest.request({
            method: 'PUT',
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
