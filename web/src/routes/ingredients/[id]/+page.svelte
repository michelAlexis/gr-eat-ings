<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    const { ingredient } = data;
</script>

<h1 class="h1">{ingredient.name}</h1>

<div>
    <pre>{JSON.stringify(ingredient, null, 2)}</pre>
</div>
