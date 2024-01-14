export function getSearchParamNumber(url: URL, paramName: string, defaultValue: number): number {
    const value = url.searchParams.get(paramName);
    const asNumber = Number(value);
    return value === null || isNaN(asNumber) ? defaultValue : asNumber;
}

export function getSearchParam(
    url: URL,
    paramName: string,
    defaultValue: string | null = null,
): string | null {
    const value = url.searchParams.get(paramName);
    return value === null ? defaultValue : value;
}

