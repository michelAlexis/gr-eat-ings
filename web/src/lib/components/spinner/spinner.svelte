<script lang="ts">
  import LoaderCircle from 'lucide-svelte/icons/loader-circle';
  import type { IconProps } from 'lucide-svelte';
    import { cn } from '$lib/utils';

  let { class: className }: IconProps = $props();
  
  
</script>

<LoaderCircle class={cn('animate-spin', className)} />

