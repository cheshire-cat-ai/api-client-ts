/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PromptSettings } from '../models/PromptSettings';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SettingsPromptService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Default Prompt Settings
     * @returns PromptSettings Successful Response
     * @throws ApiError
     */
    public getDefaultPromptSettings(): CancelablePromise<PromptSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/prompt/',
        });
    }

}
