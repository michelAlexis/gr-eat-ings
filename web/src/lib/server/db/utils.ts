import { type Column, type SQL, sql } from 'drizzle-orm';

export function unaccent(value: string | Column): SQL<string> {
    return sql`unaccent(${value})`;
}

export function likeIgnoreCase(column: string | Column, value: string): SQL<boolean> {
    return sql`(unaccent(${column}) ILIKE unaccent(${`%${value}%`})`;
}

export type FuzzySearchOptions = {
    column: string | Column;
    search: string;
    threshold?: number;
};
export function fuzzySearchIngoreCase(options: FuzzySearchOptions): SQL<boolean> {
    return sql`similarity(unaccent(${options.column}), unaccent(${options.search})) > ${options.threshold ?? 0.4})`;
}
