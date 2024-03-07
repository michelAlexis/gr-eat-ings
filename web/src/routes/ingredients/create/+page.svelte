<script lang="ts">
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';

    export let data: PageData;

    const { form, errors, enhance, fields, reset } = superForm(data.form, {
        dataType: 'json',
        onUpdated: ({ form }) => {
            if (form.valid) {
                console.log('Form updated', form);
                reset();
            }
        },
    });

    function addServing() {
        fields.servings.value.update((servings) => {
            servings.push({
                label: '',
                isDefault: false,
                quantity: 0,
            });

            return servings;
        });
    }

    function removeServing(index: number) {
        fields.servings.value.update((servings) => {
            if (index < 0 || index > servings.length - 1) {
                return servings;
            }
            const wasDefault = servings[index].isDefault;
            servings.splice(index, 1);

            if (wasDefault) {
                servings[0].isDefault = true;
            }

            return servings;
        });
    }

    function makeServingDefault(index: number) {
        fields.servings.value.update((servings) => {
            if (index < 0 || index > servings.length - 1) {
                return servings;
            }

            for (let i = 0; i < servings.length; i++) {
                servings[i].isDefault = i === index;
            }

            return servings;
        });
    }
</script>

<div class="container h-full mx-auto p-2 pb-4">
    <form action="?/createIngredient" method="post" use:enhance class="flex flex-col gap-3">
        <!-- Name -->
        <div class="card">
            <section class="p-4">
                <div class="grid grid-cols-5">
                    <div class="col-span-2 pt-1">
                        <span class="text-2xl font-extrabold">Name</span>
                    </div>
                    <div class="col-span-3">
                        <input
                            name="name"
                            class="input"
                            bind:value={$form.name}
                            placeholder="Ingredient name" />
                        {#if $errors.name}
                            <p class="text-red-500">{$errors.name}</p>
                        {/if}
                    </div>
                </div>
            </section>
        </div>
        <!-- Description -->
        <div class="card">
            <section class="p-4">
                <div class="grid grid-cols-5">
                    <div class="col-span-2 pt-1">
                        <span class="text-2xl font-extrabold">Description</span>
                    </div>
                    <div class="col-span-3">
                        <textarea
                            name="description"
                            class="input min-h-[7rem]"
                            bind:value={$form.description}
                            placeholder="Yummy !" />
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
                    <div class="col-span-2 pt-1">
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
                                                        bind:value={$form.refQuantity} />
                                                    <div class="*:rounded-l-none *:border-l-0">
                                                        <RadioGroup display="flex">
                                                            <RadioItem
                                                                bind:group={$form.refUnit}
                                                                value={'gr'}
                                                                ldabel="gr"
                                                                name="refUnit">
                                                                gr
                                                            </RadioItem>
                                                            <RadioItem
                                                                bind:group={$form.refUnit}
                                                                value={'ml'}
                                                                label="ml"
                                                                name="refUnit">
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
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="kcal"
                                                        bind:value={$form.kcal} />
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
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fat"
                                                        bind:value={$form.fat} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fat}
                                                    <span class="text-error-500"
                                                        >{$errors.fat}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Saturated fat-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r pl-3">Saturated fat</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fatSaturated"
                                                        bind:value={$form.fatSaturated} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fatSaturated}
                                                    <span class="text-error-500"
                                                        >{$errors.fatSaturated}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Carbs-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Carbs</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="carbs"
                                                        bind:value={$form.carbs} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.carbs}
                                                    <span class="text-error-500"
                                                        >{$errors.carbs}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Sugar-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r pl-3">Sugar</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="sugar"
                                                        bind:value={$form.sugar} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.sugar}
                                                    <span class="text-error-500"
                                                        >{$errors.sugar}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Fiber-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Fiber</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="fiber"
                                                        bind:value={$form.fiber} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.fiber}
                                                    <span class="text-error-500"
                                                        >{$errors.fiber}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Protein-->
                                        <tr>
                                            <td class="w-1/2 py-2 border-r">Protein</td>
                                            <td class="pl-2 pb-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="protein"
                                                        bind:value={$form.protein} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.protein}
                                                    <span class="text-error-500"
                                                        >{$errors.protein}</span>
                                                {/if}
                                            </td>
                                        </tr>
                                        <!--Salt-->
                                        <tr>
                                            <td class="w-1/2 pt-2 border-r">Salt</td>
                                            <td class="pl-2 pi-2">
                                                <label
                                                    class="input-group input-group-divider grid-cols-[auto_4rem]">
                                                    <input
                                                        type="number"
                                                        class="input rounded-r-none"
                                                        name="salt"
                                                        step="0.01"
                                                        bind:value={$form.salt} />
                                                    <div class="text-center">gr</div>
                                                </label>
                                                {#if $errors.salt}
                                                    <span class="text-error-500"
                                                        >{$errors.salt}</span>
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

        <!-- Serings -->
        <div class="card">
            <section class="p-4">
                <div class="grid grid-cols-5">
                    <div class="col-span-2 pt-1">
                        <span class="text-2xl font-extrabold">Servings</span>
                    </div>
                    <div class="col-span-3">
                        <div class="flex justify-end mt-2">
                            {#if $form.servings.length}
                                <span class="mr-11">Default</span>
                            {/if}
                        </div>
                        {#each $form.servings as _, i}
                            <div class="flex items-center gap-3 mb-2">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="Label"
                                    bind:value={$form.servings[i].label} />
                                <span>=</span>
                                <input
                                    type="number"
                                    class="input"
                                    bind:value={$form.servings[i].quantity} />
                                <span class="w-4">{$form.refUnit}</span>
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:checked={$form.servings[i].isDefault}
                                    on:change={(_) => makeServingDefault(i)} />
                                <button
                                    type="button"
                                    class="btn variant-filled"
                                    disabled={i === 0}
                                    on:click={(_) => removeServing(i)}>-</button>
                            </div>
                            {#if $errors.servings?.[i].label}
                                <div class="text-error-500">{$errors.servings?.[i].label}</div>
                            {/if}
                            {#if $errors.servings?.[i].quantity}
                                <div class="text-error-500">{$errors.servings?.[i].quantity}</div>
                            {/if}
                        {/each}
                        {#if $errors.servings?._errors}
                            <div class="text-error-500">{$errors.servings?._errors}</div>
                        {/if}
                        <button
                            type="button"
                            class="btn variant-filled"
                            on:click={(_) => addServing()}>Add</button>
                    </div>
                </div>
            </section>
        </div>
        <div class="flex justify-end">
            <button type="submit" class="btn variant-filled">Create</button>
        </div>
    </form>
</div>
