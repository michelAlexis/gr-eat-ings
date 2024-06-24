<script lang="ts">
import type { PageData } from './$types';

export let data: PageData;

$: ({ ingredients, totalElements } = data);
</script>

<div class="container mx-auto mt-4">
    <div class="card">
        <header class="h1 card-header">Ingredient list</header>
        <section class="p-4">
            <div>Total elements: {totalElements}</div>
            {#each ingredients as ingredient}
                <article>
                    <div class="flex items-center gap-2">
                        <a href={`/ingredients/${ingredient.id}`}>
                            {ingredient.id} - {ingredient.name}
                        </a>
                        <form action="?/deleteIngredient&id={ingredient.id}" method="post">
                            <button class="btn btn-sm variant-filled" type="submit">Delete</button>
                        </form>
                    </div>
                </article>
            {/each}
        </section>
    </div>
</div>
