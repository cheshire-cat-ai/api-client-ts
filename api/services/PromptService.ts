/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DefaultPromptSettings } from '../models/DefaultPromptSettings';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PromptService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Default Prompt Settings
     * @returns DefaultPromptSettings Successful Response
     * @throws ApiError
     */
    public getDefaultPromptSettings(): CancelablePromise<DefaultPromptSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/prompt/settings/',
        });
    }

}
