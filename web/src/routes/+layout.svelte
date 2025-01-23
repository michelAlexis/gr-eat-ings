<script lang="ts">
import Header from '$lib/components/layout/header.svelte';
import type { PageData } from './$types';
import type { Snippet } from 'svelte';
import '../app.css';

let { data, children }: { data: PageData; children: Snippet } = $props();
</script>

<Header user={data.user}/>
<main>
  {@render children()}
</main>
