/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BodyUploadFile = {
    file: Blob;
    /**
     * Maximum length of each chunk after the document is split (in characters)
     */
    chunk_size?: number;
    /**
     * Chunk overlap (in characters)
     */
    chunk_overlap?: number;
};
