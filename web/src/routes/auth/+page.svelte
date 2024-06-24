<script lang="ts">
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-svelte';
import { onMount } from 'svelte';
import type { PageData } from './$types';

export let data: PageData;

const { supabase, url } = data;
// Invalid session on load.
onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, _session) => {
        if (_session) {
            window.location.reload();
        }
    });

    return () => data.subscription.unsubscribe();
});
</script>

<svelte:head>
    <title>Authentication</title>
</svelte:head>

<div class="container h-full mx-auto">
    <Auth
        supabaseClient={supabase}
        redirectTo={`${url}/auth/callback`}
        appearance={{
            theme: ThemeSupa,
            //variables: {
            //    default: {
            //        colors: {
            //            brand: 'var(--color-primary-500)',
            //        },
            //    },
            //},
        }} />
</div>
