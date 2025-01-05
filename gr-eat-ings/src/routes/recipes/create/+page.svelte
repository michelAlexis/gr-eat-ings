<script lang="ts">
  import type { PageData } from "./$types.js";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import IngredientSearchCombobox from "$lib/components/ingredient-search-combobox.svelte";
  import SuperDebug, { superForm, arrayProxy } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { createRecipeSchema } from "./schema";
  import { fromStore } from "svelte/store";
  import { toast } from "svelte-sonner";
  import { Toaster } from "$lib/components/ui/sonner";

  type Props = { data: PageData };
  let { data }: Props = $props();

  const form = superForm(data.form, {
    dataType: "json",
    validators: zodClient(createRecipeSchema),
    onUpdated: ({ form }) => {
      if (form.valid) {
        reset();
        toast.success("Ingredient has been created");
      }
    },
  });

  const { form: formData, errors, enhance, reset } = form;
  const { values: ingredients, valueErrors: ingredientsErrors } = arrayProxy(
    form,
    "ingredients",
  );
  const formDataState = fromStore(formData);

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
      <Form.Description>This is the ingredient display name.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Button>Submit</Form.Button>
  </form>

  <SuperDebug data={formData} />
</div>
