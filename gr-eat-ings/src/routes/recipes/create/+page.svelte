<script lang="ts">
import type { PageData } from './$types.js';
import * as Form from '$lib/components/ui/form';
import { Input } from '$lib/components/ui/input';
import IngredientSearchCombobox from '$lib/components/ingredient-search-combobox.svelte';
import SuperDebug, { superForm, arrayProxy } from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { createRecipeSchema } from './schema';
import { fromStore } from 'svelte/store';
import { toast } from 'svelte-sonner';
import { Toaster } from '$lib/components/ui/sonner';
import { Textarea } from '$lib/components/ui/textarea/index.js';
import { Button } from '$lib/components/ui/button/index.js';
import { tick } from 'svelte';
import Trash2 from 'lucide-svelte/icons/trash-2';

type Props = { data: PageData };
let { data }: Props = $props();

const form = superForm(data.form, {
    dataType: 'json',
    validators: zodClient(createRecipeSchema),
    onUpdated: ({ form }) => {
        if (form.valid) {
            reset();
            toast.success('Ingredient has been created');
        }
    },
});

const { form: formData, errors, enhance, reset } = form;
const ingredientsProxy = arrayProxy(form, 'ingredients');
const stepsProxy = arrayProxy(form, 'steps');
const steps = stepsProxy.values;
const formDataState = fromStore(formData);

function addStep() {
    stepsProxy.values.update((list) => {
        list.push('');

        // Focus new textarea
        const newIndex = list.length - 1;
        tick().then(() => {
            const elementId = getStepInputId(newIndex);
            const element = document.querySelector<HTMLElement>(`#${elementId}`);
            if (element) {
                element.focus();
            }
        });
        return list;
    });
}
function removeStep(index: number) {
    stepsProxy.values.update((list) => {
        if (index < 0 || index > list.length - 1) {
            return list;
        }
        list.splice(index, 1);
        return list;
    });
}
function getStepInputId(index: number) {
    return `recipe-step-${index}`;
}
</script>

<div class="container">
  <Toaster richColors position="top-right" offset="60px" />
  <form method="POST" use:enhance>
    <Form.Field {form} name="label">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Name</Form.Label>
          <Input {...props} bind:value={$formData.label} />
        {/snippet}
      </Form.Control>
      <Form.Description>Display name for the recipe.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="steps">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>Steps</Form.Label>
          {#each $steps, i}
            <div class="flex gap-2">
              <div class="w-[3rem] flex items-baseline">
                <span class="text-md font-bold flex-1">{i + 1}.</span>
                {#if i !== 0}
                  <Button
                    variant="ghost"
                    class="px-1 py-0 h-6"
                    onclick={() => removeStep(i)}
                    tabindex={2}
                  >
                    <Trash2 class="size-4" />
                  </Button>
                {/if}
              </div>
              <Textarea
                {...props}
                bind:value={$formData.steps[i]}
                placeholder="Add instructions"
                class="pl-4"
                id={getStepInputId(i)}
              />
            </div>
          {/each}

          <Button onclick={addStep}>Add</Button>
        {/snippet}
      </Form.Control>
    </Form.Field>
    <Form.Button>Submit</Form.Button>
  </form>

  <SuperDebug data={formData} />
</div>
