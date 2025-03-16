import type { IngredientSearchEvents, IngredientSearchResult as SearchResult } from '../../../routes/ingredients/search/+server';
import type {
    IngredientSearchBarcode,
    IngredientSearchBarcodeResponse,
} from '../../../routes/ingredients/search-barcode/+server';
import { postJson, streamJson } from './utils';

export type IngredientSearchResult = SearchResult;
export function searchIngredients(query: string, onmessage: (v: IngredientSearchEvents) => void) {
    const ab = new AbortController();
    streamJson<IngredientSearchEvents>({
        url: `/ingredients/search?query=${encodeURIComponent(query)}`,
        onmessage,
        signal: ab.signal,
    });
    return ab;
}

export async function searchIngredientsBarcode(barcode: string) {
    return postJson<IngredientSearchBarcodeResponse>('/ingredients/search-barcode', {
        barcode,
    } satisfies IngredientSearchBarcode);
}
