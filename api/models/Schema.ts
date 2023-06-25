/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Schema = {
    title: string;
    description: string;
    properties: Record<string, any>;
    required?: Array<string>;
    additionalProperties: boolean;
    name_human_readable: string;
};
