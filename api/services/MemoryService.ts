/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionsList } from '../models/CollectionsList';
import type { ConversationMessage } from '../models/ConversationMessage';
import type { DeleteResponse } from '../models/DeleteResponse';
import type { MemoryRecall } from '../models/MemoryRecall';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MemoryService {

    constructor(private readonly httpRequest: BaseHttpRequest) {}

    /**
     * Recall Memories From Text
     * Search k memories similar to given text.
     * @param text Find memories similar to this text.
     * @param k How many memories to return.
     * @returns MemoryRecall Successful Response
     * @throws ApiError
     */
    public recallMemoriesFromText(
        text: string,
        k: number = 100,
    ): CancelablePromise<MemoryRecall> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/memory/recall',
            query: {
                'text': text,
                'k': k,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Collections
     * Get list of available collections
     * @returns CollectionsList Successful Response
     * @throws ApiError
     */
    public getCollections(): CancelablePromise<CollectionsList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/memory/collections',
        });
    }

    /**
     * Wipe Collections
     * Delete and create all collections
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public wipeCollections(): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/memory/collections',
        });
    }

    /**
     * Wipe Single Collection
     * Delete and recreate a collection
     * @param collectionId
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public wipeSingleCollection(
        collectionId: string,
    ): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/memory/collections/{collection_id}',
            path: {
                'collection_id': collectionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Point In Memory
     * Delete specific point in memory
     * @param collectionId
     * @param memoryId
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public deletePointInMemory(
        collectionId: string,
        memoryId: string,
    ): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/memory/collections/{collection_id}/points/{memory_id}',
            path: {
                'collection_id': collectionId,
                'memory_id': memoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Wipe Memory Points By Metadata
     * Delete points in memory by filter
     * @param collectionId
     * @param requestBody
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public wipeMemoryPoints(
        collectionId: string,
        requestBody?: Record<string, any>,
    ): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/memory/collections/{collection_id}/points',
            path: {
                'collection_id': collectionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Conversation History
     * Get the specified user's conversation history from working memory
     * @returns any Successful Response
     * @throws ApiError
     */
    public getConversationHistory(): CancelablePromise<{
        history: Array<ConversationMessage>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/memory/conversation_history',
        });
    }

    /**
     * Wipe Conversation History
     * Delete the specified user's conversation history from working memory
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public wipeConversationHistory(): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/memory/conversation_history',
        });
    }

}
