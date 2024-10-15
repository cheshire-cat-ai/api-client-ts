/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BodyUploadFile = {
    file: Blob;
    /**
     * Maximum length of each chunk after the document is split (in tokens)
     */
    chunk_size?: (number | null);
    /**
     * Chunk overlap (in tokens)
     */
    chunk_overlap?: (number | null);
    /**
     * Metadata to be stored with each chunk (e.g. author, category, etc.). Since we are passing this along side form data, must be a JSON string.
     */
    metadata?: string;
};

