/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BodyInstallPlugin } from '../models/BodyInstallPlugin';
import type { BodyUploadUrl } from '../models/BodyUploadUrl';
import type { DeleteResponse } from '../models/DeleteResponse';
import type { FileResponse } from '../models/FileResponse';
import type { Plugin } from '../models/Plugin';
import type { PluginsList } from '../models/PluginsList';
import type { Setting } from '../models/Setting';
import type { SettingsResponse } from '../models/SettingsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PluginsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List Available Plugins
     * List both installed and registry plugins
     * @param query 
     * @returns PluginsList Successful Response
     * @throws ApiError
     */
    public listAvailablePlugins(
query?: string,
): CancelablePromise<PluginsList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plugins/',
            query: {
                'query': query,
            },
        });
    }

    /**
     * Install Plugin
     * Install a new plugin from a zip file
     * @param formData 
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    public installPlugin(
formData: BodyInstallPlugin,
): CancelablePromise<FileResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plugins/upload/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Install Plugin From Registry
     * Install a new plugin from external repository
     * @param requestBody 
     * @returns FileResponse Successful Response
     * @throws ApiError
     */
    public installPluginFromRegistry(
requestBody: BodyUploadUrl,
): CancelablePromise<FileResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plugins/upload/registry',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Toggle Plugin
     * Enable or disable a single plugin
     * @param pluginId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public togglePlugin(
pluginId: string,
): CancelablePromise<{
info: string;
}> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/plugins/toggle/{plugin_id}',
            path: {
                'plugin_id': pluginId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Plugin Details
     * Returns information on a single plugin
     * @param pluginId 
     * @returns Plugin Successful Response
     * @throws ApiError
     */
    public getPluginDetails(
pluginId: string,
): CancelablePromise<Plugin> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plugins/{plugin_id}',
            path: {
                'plugin_id': pluginId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Plugin
     * Physically remove a plugin
     * @param pluginId 
     * @returns DeleteResponse Successful Response
     * @throws ApiError
     */
    public deletePlugin(
pluginId: string,
): CancelablePromise<DeleteResponse> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/plugins/{plugin_id}',
            path: {
                'plugin_id': pluginId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Plugins Settings
     * Returns the settings of all the plugins
     * @returns SettingsResponse Successful Response
     * @throws ApiError
     */
    public getPluginsSettings(): CancelablePromise<SettingsResponse> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plugins/settings/',
        });
    }

    /**
     * Get Plugin Settings
     * Returns the settings of a specific plugin
     * @param pluginId 
     * @returns any Successful Response
     * @throws ApiError
     */
    public getPluginSettings(
pluginId: string,
): CancelablePromise<(Setting & {
schema: Record<string, any>;
})> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plugins/settings/{plugin_id}',
            path: {
                'plugin_id': pluginId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Upsert Plugin Settings
     * Updates the settings of a specific plugin
     * @param pluginId 
     * @param requestBody 
     * @returns Setting Successful Response
     * @throws ApiError
     */
    public upsertPluginSettings(
pluginId: string,
requestBody: Record<string, any>,
): CancelablePromise<Setting> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/plugins/settings/{plugin_id}',
            path: {
                'plugin_id': pluginId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
