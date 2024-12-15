import type { IngredientSearchResponse } from '../../../routes/ingredients/search/+server';
import { postJson } from './utils';

export async function searchIngredients(search: string) {
    return postJson<IngredientSearchResponse>('/ingredients/search', { name: search });
}
