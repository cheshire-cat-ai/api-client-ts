/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Plugin } from './Plugin';

export type PluginResponse = {
    filename: string;
    content_type: string;
    info: Plugin;
};
