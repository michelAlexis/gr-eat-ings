<script lang="ts">
    import '../app.postcss';
    import { AppShell, AppBar, Avatar } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;
    const { supabase, session, user } = data;
    const initials = 'AM';

    // Invalid session on load.
    // Copy from doc: https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit#creating-a-supabase-client-for-ssr
    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => data.subscription.unsubscribe();
    });

    // Floating UI for Popups
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
                            class="hover:variant-soft-primary p-2 rounded-md">
                            {item.label}
                        </a>
                    {/each}
                </div>
            </svelte:fragment>

            <svelte:fragment slot="trail">
                <Avatar {initials} width="w-10"/>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
