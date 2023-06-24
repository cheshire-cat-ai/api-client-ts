/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Body_upload_url = {
    /**
     * URL of the website to which you want to save the content
     */
    url: string;
    /**
     * Maximum length of each chunk after the document is split (in characters)
     */
    chunk_size?: number;
    /**
     * Chunk overlap (in characters)
     */
    chunk_overlap?: number;
};
