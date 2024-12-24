/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Plugin = {
    id: string;
    name: string;
    description: string;
    author_name: string;
    author_url: string;
    plugin_url: string;
    tags: string;
    thumb: string;
    version: string;
    min_cat_version?: string;
    max_cat_version?: string;
    active?: boolean;
    url?: string;
    upgrade?: string;
    hooks?: Array<{
        name: string;
        priority: number;
    }>;
    tools?: Array<{
        name: string;
    }>;
};

