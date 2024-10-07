/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Setting } from '../models/Setting';
import type { SettingsResponse } from '../models/SettingsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthHandlerService {
    constructor(private readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Auth Handler Settings
     * Get the list of the AuthHandlers
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    public getAuthHandlerSettings(): CancelablePromise<SettingsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth_handler/settings',
        });
    }
    /**
     * Get Auth Handler Setting
     * Get the settings of a specific AuthHandler
     * @param authHandlerName
     * @returns Setting Successful Response
     * @throws ApiError
     */
    public getAuthHandlerSetting(
        authHandlerName: string,
    ): CancelablePromise<Setting> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth_handler/settings/{auth_handler_name}',
            path: {
                'auth_handler_name': authHandlerName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Upsert Authenticator Setting
     * Upsert the settings of a specific AuthHandler
     * @param authHandlerName
     * @param requestBody
     * @returns Setting Successful Response
     * @throws ApiError
     */
    public upsertAuthenticatorSetting(
        authHandlerName: string,
        requestBody: Record<string, any>,
    ): CancelablePromise<Setting> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/auth_handler/settings/{auth_handler_name}',
            path: {
                'auth_handler_name': authHandlerName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
