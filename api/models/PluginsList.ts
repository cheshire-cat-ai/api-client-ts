/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Plugin } from './Plugin';

export type PluginsList = {
    results: number;
    installed: Array<Plugin>;
    registry: Array<Plugin>;
};
