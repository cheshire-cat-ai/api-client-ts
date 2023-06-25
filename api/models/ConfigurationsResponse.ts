/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Schema } from './Schema';
import type { Setting } from './Setting';

export type ConfigurationsResponse = {
    status: string;
    results: number;
    settings: Array<Setting>;
    schemas: Array<Schema>;
    allowed_configurations: Array<string>;
    selected_configuration: string;
};
