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
import { toast } from 'svelte-sonner';
import { Toaster } from '$lib/components/ui/sonner';

interface Props {
    data: SuperValidated<Infer<typeof createIngredientSchema>>;
}
const { data }: Props = $props();

const form = superForm(data, {
    dataType: 'json',
    validators: zodClient(createIngredientSchema),
    onUpdated: ({ form }) => {
        if (form.valid) {
            reset();
            toast.success('Ingredient has been created');
        }
    },
});

const { form: formData, errors, enhance, reset } = form;
const { values: servings, valueErrors: servingsErrors } = arrayProxy(form, 'servings');
const formDataState = fromStore(formData);
</script>

<Toaster richColors position="top-right" offset="60px" />
<form method="POST" use:enhance>
    <Form.Field {form} name="label">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Name</Form.Label>
                <Input {...props} bind:value={$formData.label} />
            {/snippet}
        </Form.Control>
        <Form.Description>
            This is the ingredient display name.
        </Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="kcal">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>kcal</Form.Label>
                <Input {...props} type="number" bind:value={$formData.kcal} />
            {/snippet}
        </Form.Control>
        <Form.Description>Number of kcal per 100gr</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Button>Submit</Form.Button>
</form>

<SuperDebug data={formDataState} />
