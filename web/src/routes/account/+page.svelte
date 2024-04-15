<script lang="ts">
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { PageData } from './$types.js';

    export let data: PageData;
    export let form;

    let { user, profile } = data;
    $: ({ user, profile } = data);

    let loading = false;
    let fullName: string = profile?.full_name ?? '';
    let username: string = profile?.username ?? '';
    let website: string = profile?.website ?? '';
    let avatarUrl: string = profile?.avatar_url ?? '';

    const handleSubmit: SubmitFunction = () => {
        loading = true;
        return async () => {
            loading = false;
        };
    };

    const handleSignOut: SubmitFunction = () => {
        loading = true;
        return async ({ update }) => {
            loading = false;
            update();
        };
    };
</script>

<svelte:head>
    <title>Account</title>
</svelte:head>

<div class="container m-auto">
    <div class="form-widget card mt-3">
        <form
            class="form-widget p-4 flex flex-col gap-3"
            method="post"
            action="?/update"
            use:enhance={handleSubmit}>
            <div>
                <label class="label">
                    <span>Email</span>
                    <input type="text" value={user.email} disabled class="input" />
                </label>
            </div>

            <div>
                <label class="label">
                    <span>Full Name</span>
                    <input
                        name="fullName"
                        type="text"
                        value={form?.fullName ?? fullName}
                        class="input" />
                </label>
            </div>

            <div>
                <label class="label">
                    <span>Username</span>
                    <input
                        name="username"
                        type="text"
                        value={form?.username ?? username}
                        class="input" />
                </label>
            </div>

            <div>
                <label class="label">
                    <span>Website</span>
                    <input
                        name="website"
                        type="url"
                        value={form?.website ?? website}
                        class="input" />
                </label>
            </div>

            <div class="flex gap-2">
                <input
                    type="submit"
                    class="btn block variant-filled-primary"
                    value={loading ? 'Loading...' : 'Update'}
                    disabled={loading} />
                <form method="post" action="?/signout" use:enhance={handleSignOut}>
                    <div>
                        <button class="btn variant-outline-secondary block" disabled={loading}
                            >Sign Out</button>
                    </div>
                </form>
            </div>
        </form>
    </div>
</div>
