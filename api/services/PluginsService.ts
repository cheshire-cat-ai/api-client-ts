/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BodyInstallPlugin } from '../models/BodyInstallPlugin';
import type { Plugin } from '../models/Plugin';
import type { PluginsList } from '../models/PluginsList';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PluginsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List Available Plugins
     * List available plugins
     * @returns PluginsList Successful Response
     * @throws ApiError
     */
    public listAvailablePlugins(): CancelablePromise<PluginsList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/plugins/',
        });
    }

    /**
     * Install Plugin
     * Install a new plugin from a zip file
     * @returns any Successful Response
     * @throws ApiError
     */
    public installPlugin({
formData,
}: {
formData: BodyInstallPlugin,
}): CancelablePromise<Record<string, any>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/plugins/install/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Toggle Plugin
     * Enable or disable a single plugin
     * @returns any Successful Response
     * @throws ApiError
     */
    public togglePlugin({
pluginId,
}: {
pluginId: string,
}): CancelablePromise<Record<string, any>> {
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
     * @returns Plugin Successful Response
     * @throws ApiError
     */
    public getPluginDetails({
pluginId,
}: {
pluginId: string,
}): CancelablePromise<Plugin> {
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

}
