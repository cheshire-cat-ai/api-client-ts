/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Setting = {
    setting_id?: string;
    name: string;
    value: Record<string, any>;
    category?: string;
    enabled?: boolean;
    createdAt?: string;
    updatedAt?: string;
};
