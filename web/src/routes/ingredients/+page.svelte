<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    $: ({ ingredients } = data);
</script>

<div class="container h-full mx-auto">
    <h1>Ingredient list</h1>
    <div>
        {#each ingredients as ingredient}
            <article>
                <div>
                    {ingredient.id} - {ingredient.name}
                    <form action="?/deleteIngredient&id={ingredient.id}" method="post">
                        <button class="btn" type="submit">Delete</button>
                    </form>
                </div>
            </article>
        {/each}
    </div>
</div>
