<script lang="ts">
import * as Form from '$lib/components/ui/form';
import { Input } from '$lib/components/ui/input';
import SuperDebug, {
    type SuperValidated,
    type Infer,
    superForm,
    arrayProxy,
} from 'sveltekit-superforms';
import { zodClient } from 'sveltekit-superforms/adapters';
import { createIngredientSchema } from './schema';
import { fromStore } from 'svelte/store';

interface Props {
    data: SuperValidated<Infer<typeof createIngredientSchema>>;
}
const { data }: Props = $props();

const form = superForm(data, {
    dataType: 'json',
    validators: zodClient(createIngredientSchema),
    onUpdated: ({ form }) => {
        if (form.valid) {
            console.log('Form submited', form);
            reset();
        }
    },
});

const { form: formData, errors, enhance, reset } = form;
const { values: servings, valueErrors: servingsErrors } = arrayProxy(form, 'servings');
const formDataState = fromStore(formData);
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Name</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.Description>This is the ingredient display name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>

<SuperDebug data={formDataState} />
