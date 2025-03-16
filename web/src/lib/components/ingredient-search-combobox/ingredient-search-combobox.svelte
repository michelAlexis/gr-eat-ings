<script lang="ts">
    import { type IngredientSearchResult } from "$lib/client/api/ingredients";
    import { debounced } from "$lib/client/runes/debounced.svelte";
    import { Button, type ButtonProps } from "$lib/components/ui/button";
    import * as Command from "$lib/components/ui/command";
    import * as Popover from "$lib/components/ui/popover";
    import { cn } from "$lib/utils.js";
    import Check from "lucide-svelte/icons/check";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { onDestroy, tick } from "svelte";
    import Spinner from "../spinner/spinner.svelte";
    import { IngredientSearchQuery } from "./ingredient-search-query.svelte";

    interface Props extends Omit<ButtonProps, "value"> {
        value?: IngredientSearchResult | null;
    }

    let {
        value = $bindable(),
        class: className,
        ...restProps
    }: Props = $props();

    let open = $state(false);
    let triggerRef = $state<HTMLElement | null>(null);

    let searchTerm = debounced("", 500);
    const query = new IngredientSearchQuery(() => searchTerm.debounced);
    onDestroy(() => query.abort());

    function closeAndFocusTrigger() {
        open = false;
        tick().then(() => {
            triggerRef?.focus();
        });
    }
    export function focus() {
        triggerRef?.focus();
    }
</script>

<Popover.Root bind:open>
    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({ props })}
            <Button
                variant="outline"
                class={cn("justify-between w-full", className)}
                {...props}
                {...restProps}
                role="combobox"
                aria-expanded={open}
            >
                {value?.name ?? "Search ingredient"}
                <ChevronsUpDown class="opacity-50" />
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-[400px] p-0">
        <Command.Root shouldFilter={false}>
            <Command.Input
                bind:value={searchTerm.current}
                placeholder="Search ingredient.."
            />
            <Command.List>
                {#if query.loading}
                    <Command.Loading
                        class="text-muted-foreground text-sm flex gap-2 items-center justify-center py-6"
                    >
                        <Spinner class="size-4" />
                        Searching...
                    </Command.Loading>
                {/if}
                {#if query.hasValue && query.options?.length === 0}
                    <Command.Empty forceMount={true}>
                        No ingredient found.
                    </Command.Empty>
                {:else if query.options?.length > 0}
                    <Command.Group>
                        {#each query.options as option}
                            <Command.Item
                                value={option.id.toString()}
                                onSelect={() => {
                                    value = option;
                                    closeAndFocusTrigger();
                                }}
                            >
                                <Check
                                    class={cn(
                                        value?.id !== option.id &&
                                            "text-transparent",
                                    )}
                                />
                                {option.name}
                                <span class="text-muted-foreground">
                                    {option.kcal}kcal
                                </span>
                            </Command.Item>
                        {/each}
                    </Command.Group>
                {/if}
            </Command.List>
        </Command.Root>
    </Popover.Content>
</Popover.Root>
