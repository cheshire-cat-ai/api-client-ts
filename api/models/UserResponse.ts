/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthPermission } from './AuthPermission';
export type UserResponse = {
    username: string;
    permissions?: Record<string, Array<AuthPermission>>;
    id: string;
};

