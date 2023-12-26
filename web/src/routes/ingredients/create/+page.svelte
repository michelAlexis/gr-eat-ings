<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;

    $: console.log('form', form);
</script>

<div class="container h-full mx-auto mt-3">
    <div class="card">
        <header class="card-header">Create ingredients</header>
        <section class="p-4">
            <form action="?/createIngredient" method="post" use:enhance>
                <label class="label">
                    <span>Name</span>
                    <input
                        type="text"
                        name="name"
                        class={'input ' + (form?.errors?.name ? 'input-error' : '')}
                        value={form?.formValue?.name ?? ''}
                    />
                    {#if form?.errors?.name}
                        <p class="text-red-500">{form?.errors?.name}</p>
                    {/if}
                </label>
                <button type="submit" class="btn variant-filled mt-2">Create</button>
            </form>
        </section>
    </div>
</div>
