/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CatMessage } from '../models/CatMessage';
import type { Status } from '../models/Status';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class StatusService {
    constructor(private readonly httpRequest: BaseHttpRequest) {}
    /**
     * Home
     * Server status
     * @returns Status Successful Response
     * @throws ApiError
     */
    public home(): CancelablePromise<Status> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Message With Cat
     * Get a response from the Cat
     * @param requestBody
     * @returns CatMessage Successful Response
     * @throws ApiError
     */
    public messageWithCat(
        requestBody?: {
            text: string;
        },
    ): CancelablePromise<CatMessage> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/message',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
