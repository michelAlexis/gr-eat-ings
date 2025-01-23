<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils.js";

interface Ingredient {
    id: number;
    label: string;
}
interface Props {
    value?: Ingredient | null;
    onselect?: (ing: Ingredient) => void;
}

let { value = $bindable(), onselect }: Props = $props();
</script>


