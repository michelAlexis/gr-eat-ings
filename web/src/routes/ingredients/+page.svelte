<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    $: ({ ingredients } = data);
</script>

<div class="container h-full mx-auto">
    <h1>Ingredient list</h1>
    <div>
        {#each ingredients as ingredient}
            <div>{ingredient.id} - {ingredient.name}</div>
        {/each}
    </div>
</div>
