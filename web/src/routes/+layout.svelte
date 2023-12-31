<script lang="ts">
    import '../app.postcss';
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';

    // Floating UI for Popups
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    const menu = [
        {
            href: '/ingredients',
            label: 'Ingredients',
        },
        {
            href: '/ingredients/create',
            label: 'Create Ingredient',
        },
    ];
</script>

<!-- App Shell -->
<AppShell>
    <svelte:fragment slot="header">
        <!-- App Bar -->
        <AppBar>
            <svelte:fragment slot="lead">
                <div>
                    <a href="/">
                        <strong class="text-xl">Gr</strong>
                        <strong class="text-xl text-primary-500">eat</strong>
                        <strong class="text-xl">ings</strong>
                    </a>
                </div>
                <div class="ml-6 flex gap-3">
                    {#each menu as item}
                        <a
                            href={item.href}
                            class:font-bold={$page.url.pathname === item.href}
                            class="hover:variant-soft-primary p-2 rounded-md"
                        >
                            {item.label}
                        </a>
                    {/each}
                </div>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
