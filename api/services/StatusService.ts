/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StatusService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Home
     * Server status
     * @returns any Successful Response
     * @throws ApiError
     */
    public home(): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/',
        });
    }

}
