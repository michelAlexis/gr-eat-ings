<script lang="ts">
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();
</script>

<div class="container">Hello {data.user?.name}</div>
