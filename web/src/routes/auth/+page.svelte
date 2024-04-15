<script lang="ts">
    import { Auth } from '@supabase/auth-ui-svelte';
    import type { PageData } from './$types';
    import { ThemeSupa } from '@supabase/auth-ui-shared';

    export let data: PageData;

    const { supabase, url } = data;
    console.log('Auth url', url);
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
