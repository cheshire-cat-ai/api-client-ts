/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonSchema } from './JsonSchema';
import type { Setting } from './Setting';

export type ConfigurationsResponse = {
    status: string;
    results: number;
    settings: Array<Setting>;
    schemas: Record<string, (JsonSchema & {
name_human_readable?: string;
})>;
    allowed_configurations: Array<string>;
    selected_configuration: string;
};
