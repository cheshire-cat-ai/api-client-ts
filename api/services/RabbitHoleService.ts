/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BodyUploadFile } from '../models/BodyUploadFile';
import type { BodyUploadMemory } from '../models/BodyUploadMemory';
import type { BodyUploadUrl } from '../models/BodyUploadUrl';
import type { FileResponse } from '../models/FileResponse';
import type { WebResponse } from '../models/WebResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RabbitHoleService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Upload File
     * Upload a file containing text (.txt, .md, .pdf, etc.). File content will be extracted and segmented into chunks.
 * Chunks will be then vectorized and stored into documents memory.
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    public uploadFile({
formData,
}: {
formData: BodyUploadFile,
}): CancelablePromise<FileResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload Url
     * @returns WebResponse Successful Response
     * @throws ApiError
     */
    public uploadUrl({
requestBody,
}: {
requestBody: BodyUploadUrl,
}): CancelablePromise<WebResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole/web/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload Memory
     * Upload a memory json file to the CCat memory
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadMemory({
formData,
}: {
formData: BodyUploadMemory,
}): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole/memory/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
