<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        onUpdated: ({ form }) => {
            console.log('Form updated', form);
        },
    });
</script>

<div class="container h-full mx-auto p-2">
    <form action="?/createIngredient" method="post" use:enhance class="flex flex-col gap-3">
        <div>
            <input
                type="text"
                name="name"
                class="input rounded-container-token text-4xl"
                placeholder="Ingredient name"
                bind:value={$form.name}
            />
            {#if $errors.name}
                <p class="text-error-500">{$errors.name}</p>
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
                        <div class="grid grid-cols-2">
                            <div class="col-span-2">
                                <table>
                                    <tbody>
                                        <!--Ref quantit/unit-->
                                        <tr class="border-b">
                                            <td class="w-1/2 border-r pb-2 font-bold">Reference</td>
                                            <td class="pl-2 pb-2">
                                                <div class="flex">
                                                    <input
                                                        type="number"
                                                        name="refQuantity"
                                                        class="input rounded-r-none"
                                                        bind:value={$form.refQuantity}
                                                    />
                                                    <div class="*:rounded-l-none *:border-l-0">
                                                        <RadioGroup display="flex">
                                                            <RadioItem
                                                                bind:group={$form.refUnit}
                                                                value={'gr'}
                                                                ldabel="gr"
                                                                name="refUnit"
                                                            >
                                                                gr
                                                            </RadioItem>
                                                            <RadioItem
                                                                bind:group={$form.refUnit}
                                                                value={'ml'}
                                                                label="ml"
                                                                name="refUnit"
                                                            >
                                                                ml
                                                            </RadioItem>
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                                {#if $errors.refQuantity}
                                                    <span class="text-error-500">
                                                        {$errors.refQuantity}
                                                    </span>
                                                {/if}
                                                {#if $errors.refUnit}
                                                    <span class="text-error-500">
                                                        {$errors.refUnit}
                                                    </span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Energie-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Energie</td>
                                            <td class="pl-2 py-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="kcal"
                                                        bind:value={$form.kcal}
                                                    />
                                                    <div class="text-center">kcal</div>
                                                </label>
                                                {#if $errors.kcal}
                                                    <span class="text-error-500">
                                                        {$errors.kcal}
                                                    </span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Fat-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Fat</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fat"
                                                        bind:value={$form.fat}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fat}
                                                    <span class="text-error-500">{$errors.fat}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Saturated fat-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r pl-3">Saturated fat</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fatSaturated"
                                                        bind:value={$form.fatSaturated}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fatSaturated}
                                                    <span class="text-error-500"
                                                        >{$errors.fatSaturated}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Carbs-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Carbs</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="carbs"
                                                        bind:value={$form.carbs}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.carbs}
                                                    <span class="text-error-500"
                                                        >{$errors.carbs}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Sugar-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r pl-3">Sugar</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="sugar"
                                                        bind:value={$form.sugar}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.sugar}
                                                    <span class="text-error-500"
                                                        >{$errors.sugar}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Fiber-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Fiber</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fiber"
                                                        bind:value={$form.fiber}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fiber}
                                                    <span class="text-error-500"
                                                        >{$errors.fiber}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Protein-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Protein</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="protein"
                                                        bind:value={$form.protein}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.protein}
                                                    <span class="text-error-500"
                                                        >{$errors.protein}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Salt-->
                                        <tr>
                                            <td class="w-1/2 pt-2 border-r">Salt</td>
                                            <td class="pl-2 pi-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]"
                                                >
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="salt"
                                                        step="0.01"
                                                        bind:value={$form.salt}
                                                    />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.salt}
                                                    <span class="text-error-500"
                                                        >{$errors.salt}</span
                                                    >
                                                {/if}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="flex justify-end">
            <button type="submit" class="btn variant-filled">Create</button>
        </div>
    </form>
</div>
