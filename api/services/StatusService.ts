/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status } from '../models/Status';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StatusService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

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

}
