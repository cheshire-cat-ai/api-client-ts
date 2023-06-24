/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Injected Admin
     * @returns any Successful Response
     * @throws ApiError
     */
    public getInjectedAdmin(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/',
        });
    }

}
