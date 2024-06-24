<script lang="ts">
import '../app.postcss';
import { goto, invalidate } from '$app/navigation';
import { page } from '$app/stores';
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { AppBar, AppShell, Avatar } from '@skeletonlabs/skeleton';
import { storePopup } from '@skeletonlabs/skeleton';
import { onMount } from 'svelte';
import type { PageData } from './$types';

export let data: PageData;
let { supabase, session, user } = data;
$: ({ supabase, session, user } = data);
const initials = 'AM';

// Invalid session on load.
// Copy from doc: https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit#creating-a-supabase-client-for-ssr
onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
        if (!newSession) {
            /**
             * Queue this as a task so the navigation won't prevent the
             * triggering function from completing
             */
            setTimeout(() => {
                goto('/', { invalidateAll: true });
            });
        }
        if (newSession?.expires_at !== session?.expires_at) {
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
                {#if user}
                    <a href="/account">
                        <Avatar
                            {initials}
                            width="w-10"
                            cursor="cursor-pointer"
                            border="border-4 border-surface-300-600-token hover:!border-primary-500" />
                    </a>
                {:else}
                    <a href="/auth">Login</a>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Page Route Content -->
    <slot />
</AppShell>
