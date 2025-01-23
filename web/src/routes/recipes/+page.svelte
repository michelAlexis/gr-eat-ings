<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import * as Table from '$lib/components/ui/table/index.js';
import type { PageData } from './$types.js';

type Props = { data: PageData };
let { data }: Props = $props();
</script>

<div class="container">
  <Table.Root>
    <Table.Caption>Simple list of recipes</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[40px]" />
        <Table.Head class="w-[100px]">Id</Table.Head>
        <Table.Head>Label</Table.Head>
        <Table.Head>Kcal</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.recipes as recipe (recipe.id)}
        <Table.Row>
          <Table.Cell>
            <form action="?/deleteRecipe&id={recipe.id}" method="post">
              <Button type="submit">Delete</Button>
            </form>
          </Table.Cell>
          <Table.Cell>{recipe.id}</Table.Cell>
          <Table.Cell>{recipe.label}</Table.Cell>
          <Table.Cell>{recipe.kcal}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
