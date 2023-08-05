/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JsonSchema } from './JsonSchema';

export type ModelsResponse = {
    status: string;
    results: number;
    settings: Array<Record<string, any>>;
    schemas: Record<string, (JsonSchema & {
nameHumanReadable?: string;
})>;
    allowed_configurations: Array<string>;
    selected_configuration: string;
};
