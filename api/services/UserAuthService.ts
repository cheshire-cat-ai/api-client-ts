/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthPermission } from '../models/AuthPermission';
import type { JWTResponse } from '../models/JWTResponse';
import type { UserCredentials } from '../models/UserCredentials';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserAuthService {
    constructor(private readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Available Permissions
     * Returns all available resources and permissions.
     * @returns AuthPermission Successful Response
     * @throws ApiError
     */
    public getAvailablePermissions(): CancelablePromise<Record<string, Array<AuthPermission>>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/available-permissions',
        });
    }
    /**
     * Auth Token
     * Endpoint called from client to get a JWT from local identity provider.
     * This endpoint receives username and password as form-data, validates credentials and issues a JWT.
     * @param requestBody
     * @returns JWTResponse Successful Response
     * @throws ApiError
     */
    public authToken(
        requestBody: UserCredentials,
    ): CancelablePromise<JWTResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
