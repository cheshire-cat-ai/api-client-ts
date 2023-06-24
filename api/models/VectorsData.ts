/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionData } from './CollectionData';

export type VectorsData = {
    embedder: string;
    collections: Record<string, Array<CollectionData>>;
};
