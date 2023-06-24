/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_file } from '../models/Body_upload_file';
import type { Body_upload_memory } from '../models/Body_upload_memory';
import type { Body_upload_url } from '../models/Body_upload_url';
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
formData: Body_upload_file,
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
requestBody: Body_upload_url,
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
formData: Body_upload_memory,
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
