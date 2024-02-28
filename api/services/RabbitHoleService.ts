/* generated using openapi-typescript-codegen -- do no edit */
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

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Upload File
     * Upload a file containing text (.txt, .md, .pdf, etc.). File content will be extracted and segmented into chunks.
     * Chunks will be then vectorized and stored into documents memory.
     * @param formData
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    public uploadFile(
        formData: BodyUploadFile,
    ): CancelablePromise<FileResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload URL
     * Upload a URL. Website content will be extracted and segmented into chunks.
     * Chunks will be then vectorized and stored into documents memory.
     * @param requestBody
     * @returns WebResponse Successful Response
     * @throws ApiError
     */
    public uploadUrl(
        requestBody: BodyUploadUrl,
    ): CancelablePromise<WebResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole/web',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upload Memory
     * Upload a memory json file to the cat memory
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public uploadMemory(
        formData: BodyUploadMemory,
    ): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rabbithole/memory',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Allowed Mimetypes
     * Retrieve the allowed mimetypes that can be ingested by the Rabbit Hole
     * @returns any Successful Response
     * @throws ApiError
     */
    public getAllowedMimetypes(): CancelablePromise<{
        allowed?: Array<string>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/rabbithole/allowed-mimetypes',
        });
    }

}
