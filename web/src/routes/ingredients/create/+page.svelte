<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form);
</script>

<div class="container h-full mx-auto">
    <SuperDebug data={$form} />
    <form action="?/createIngredient" method="post" use:enhance class="flex flex-col gap-3">
        <div>
            <input
                type="text"
                name="name"
                class="input rounded-none text-4xl"
                placeholder="Ingredient name"
                bind:value={$form.name}
            />
            {#if $errors.name}
                <p class="text-red-500">{$errors.name}</p>
            {/if}
        </div>
        <div class="card">
            <section class="p-4">
                <div class="grid grid-cols-5">
                    <div class="col-span-2">
                        <span class="text-2xl font-extrabold">Description</span>
                    </div>
                    <div class="col-span-3">
                        <textarea
                            name="description"
                            class="input min-h-[8rem]"
                            bind:value={$form.description}
                            placeholder="Yummy !"
                        />
                        {#if $errors.description}
                            <p class="text-red-500">{$errors.description}</p>
                        {/if}
                    </div>
                </div>
            </section>
        </div>
        <div class="card">
            <section class="p-4">
                <div class="grid grid-cols-5">
                    <div class="col-span-2">
                        <span class="text-2xl font-extrabold">Nutrition</span>
                    </div>
                    <div class="col-span-3">
                        TODO TABLE
                    </div>
                </div>
            </section>
        </div>
        <div class="flex justify-end">
            <button type="submit" class="btn variant-filled">Create</button>
        </div>
    </form>
</div>
