<script lang="ts">
import type { PageData } from './$types.js';
import IngredientForm from './ingredient-form.svelte';

type Props = { data: PageData };
let { data }: Props = $props();
</script>

<div class="container">
  <IngredientForm data={data.form} />
</div>
