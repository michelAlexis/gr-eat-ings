<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { Input } from "./ui/input";
  import type { IngredientUnit } from "$lib/server/db/schema";
  import { cn } from "$lib/utils";

  interface Props extends HTMLInputAttributes {
    value?: number | null;
    unit?: IngredientUnit | null;
    inputClass?: string | null;
  }

  let {
    value = $bindable(),
    unit,
    class: className,
    inputClass,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    unit &&
      "flex focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring ring-offset-background rounded-md",
    className,
  )}
>
  <Input
    bind:value
    type="number"
    class={cn(
      unit && "rounded-r-none border-r-0 focus-visible:ring-0",
      inputClass,
    )}
    {...restProps}
  />
  {#if unit}
    <div class="rounded-r-md bg-muted text-muted-foreground px-3 py-1 border">
      {unit}
    </div>
  {/if}
</div>
