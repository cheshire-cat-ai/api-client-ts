/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MetaData } from './MetaData';

export type CollectionData = {
    page_content: string;
    metadata: MetaData;
    score: number;
    vector: Array<number>;
};
