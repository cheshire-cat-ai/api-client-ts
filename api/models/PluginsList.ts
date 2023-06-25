/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Plugin } from './Plugin';

export type PluginsList = {
    status: string;
    results: number;
    installed: Array<Plugin>;
    registry: Array<Plugin>;
};
