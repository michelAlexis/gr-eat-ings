<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;

    $: ({ingredients} = data);
</script>

<div>
    <h1>Ingredient list</h1>
    {#each ingredients ?? [] as ingredient}
        <div>
            <div>{ingredient.id}</div>
            <div>{ingredient.name}</div>
        </div>
    {/each}
</div>
