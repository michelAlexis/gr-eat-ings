<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from "$lib/components/ui/card";
  import Trash2 from "lucide-svelte/icons/trash-2";
  import { tick } from "svelte";
  import { toast } from "svelte-sonner";
  import { fromStore } from "svelte/store";
  import SuperDebug, { superForm, arrayProxy } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types.js";
  import { createRecipeSchema } from "./schema";
  import Label from "$lib/components/ui/label/label.svelte";
  import { IngredientSearchCombobox } from "$lib/components/ingredient-search-combobox";
  import type { IngredientSearchResult } from "$lib/client/api/ingredients.js";
  import IngredientQuantityInput from "$lib/components/ingredient-quantity-input.svelte";

  type Props = { data: PageData };
  let { data }: Props = $props();
  type IngredientItem = {
    ingredient: IngredientSearchResult | null;
    quantity: number | null;
    comment: string | null;
  };

  const form = superForm(data.form, {
    dataType: "json",
    validators: zodClient(createRecipeSchema),
    SPA: true,
    onUpdate: ({ form }) => {
      console.log("onUpdate", form);
    },
    onUpdated: ({ form }) => {
      if (form.valid) {
        reset();
        toast.success("Ingredient has been created");
      }
    },
  });

  const { form: formData, errors, enhance, reset } = form;
  const ingredientsProxy = arrayProxy(form, "ingredients");
  const ingredients = ingredientsProxy.values;
  const stepsProxy = arrayProxy(form, "steps");
  const steps = stepsProxy.values;
  const formDataState = fromStore(formData);

  let ingredientBuff = $state<IngredientItem>({
    ingredient: null,
    quantity: null,
    comment: null,
  });
  let selectedIngredients = $state<IngredientSearchResult[]>([]);

  function addIngredient() {
    if (ingredientBuff.ingredient) {
      selectedIngredients.push(ingredientBuff.ingredient);
      ingredientsProxy.values.update((list) => {
        list.push({
          ingredientId: ingredientBuff.ingredient?.id,
          quantity: ingredientBuff.quantity,
          comment: ingredientBuff.comment,
        });
        return list;
      });
      ingredientBuff.ingredient = null;
      ingredientBuff.quantity = null;
      ingredientBuff.comment = null;
    }
  }

  function removeIngredient(index: number) {
    selectedIngredients.splice(index, 1);
    ingredientsProxy.values.update((list) => {
      if (index < 0 || index > list.length - 1) {
        return list;
      }
      list.splice(index, 1);
      return list;
    });
  }

  function addStep() {
    stepsProxy.values.update((list) => {
      list.push("");

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
    <Card class="mt-4">
      <CardHeader>
        <CardTitle>Create Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <!-- Label -->
        <Form.Field {form} name="label">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.label}
                placeholder="Enter recipe name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <!-- Description -->
        <Form.Field {form} name="description">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Description</Form.Label>
              <Textarea
                {...props}
                bind:value={$formData.label}
                rows={3}
                placeholder="Briefly describe your recipe"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <!-- Ingredients -->
        <div class="space-y-3">
          <h3 class="text-xl font-bold">Ingredients</h3>
          <div
            class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-end gap-3"
          >
            <div class="space-y-2">
              <Label class="font-bold">Ingredient</Label>
              <IngredientSearchCombobox
                bind:value={ingredientBuff.ingredient}
                placeholder="Search ingredients..."
              />
            </div>

            <div class="space-y-2">
              <Label class="font-bold">Quantity</Label>
              <IngredientQuantityInput
                bind:value={ingredientBuff.quantity}
                unit={ingredientBuff.ingredient?.unit}
                min={0}
                placeholder="eg. 1"
              />
            </div>
            <Button onclick={() => addIngredient()}>Add</Button>
          </div>

          <!-- Ingredients -->
          <Form.Field {form} name="ingredients">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Ingredients</Form.Label>
                {#each $ingredients as ingredient, i}
                  {@const ingredientItem = selectedIngredients[i]}
                  <div class="flex gap-3">
                    <Button
                      variant="ghost"
                      class="px-1 py-0 h-6"
                      tabindex={2}
                      onclick={() => removeIngredient(i)}
                    >
                      <Trash2 class="size-4" />
                    </Button>
                    <span class="ml-4">
                      {ingredientItem.name}
                    </span>
                    <IngredientQuantityInput
                      bind:value={$formData.ingredients[i].quantity}
                      unit={ingredientItem.unit}
                      min={0}
                      placeholder="eg. 1"
                    />
                  </div>
                {/each}
              {/snippet}
            </Form.Control>
          </Form.Field>
        </div>

        <!-- Steps -->
        <Form.Field {form} name="steps">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Steps</Form.Label>
              {#each $steps, i}
                <div class="flex gap-2">
                  <div class="w-[3rem] flex items-baseline">
                    <span class="text-md font-bold flex-1">{i + 1}.</span>
                    {#if $steps.length > 1}
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
      </CardContent>
      <CardFooter>
        <Form.Button>Submit</Form.Button>
      </CardFooter>
    </Card>
  </form>

  <SuperDebug data={formData} />
</div>
