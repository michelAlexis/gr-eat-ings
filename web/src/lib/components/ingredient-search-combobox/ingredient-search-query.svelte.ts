import { searchIngredients, type IngredientSearchResult } from "$lib/client/api/ingredients";

export class IngredientSearchQuery {
  options = $state<IngredientSearchResult[] | null>(null);
  error = $state<unknown>(undefined);

  readonly hasValue = $derived(this.options !== null);

  #loading = $state(false);
  #abort: AbortController | null = null;

  constructor(getter: () => string) {
    $effect(() => this.query(getter()));
  }

  private query(query: string) {
    if(query?.length < 3) {
      return;
    }
    this.#abort?.abort();
    this.#loading = true;
    this.options = null;
    this.#abort = searchIngredients(query, (e) => {
      switch(e.type) {
        case 'search-error': {
          this.error = e.error;
          this.#loading = false;
          return;
        }
        case 'search-db-name-result': {
          this.options = e.results;
          this.#loading = false;
          return;
        }
        case 'search-db-barcode-result': {
          this.options = [e.result];
          this.#loading = false;
          return;
        }
        case 'search-api-barcode-result': {
          this.options = [e.result];
          this.#loading = false;
          return;
        }
      }
    });
  }

  abort() {
    this.#abort?.abort();
    this.#abort = null;
  }

  get loading() {
    return this.#loading;
  }
}
