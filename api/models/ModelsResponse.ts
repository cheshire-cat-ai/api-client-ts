/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonSchema } from './JsonSchema';
import type { Setting } from './Setting';

export type ModelsResponse = {
    status: string;
    results: number;
    settings: Array<Setting>;
    schemas: Record<string, (JsonSchema & {
nameHumanReadable?: string;
})>;
    allowed_configurations: Array<string>;
    selected_configuration: string;
};
