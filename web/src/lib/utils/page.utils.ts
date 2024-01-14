import { getSearchParamNumber } from "./url.utils";

export const PAGE_FIRST_PARAM_NAME = 'first';
export const PAGE_SIZE_PARAM_NAME = 'size';

export type Page = {
    first: number;
    size: number;
};


export type PageOptions = {
    first?: number;
    size?: number;
    maxSize?: number;
}
export function getPageParams(url: URL, options?: PageOptions): Page {
    const size = getSearchParamNumber(url, PAGE_SIZE_PARAM_NAME, options?.size ?? 20);
    return {
        first: getSearchParamNumber(url, PAGE_FIRST_PARAM_NAME, options?.first ?? 0),
        size: options?.maxSize ? Math.min(size, options.maxSize) : size,
    };
}
