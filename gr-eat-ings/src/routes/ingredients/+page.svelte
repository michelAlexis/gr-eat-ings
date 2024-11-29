<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import * as Table from '$lib/components/ui/table/index.js';
import type { PageData } from './$types.js';

type Props = { data: PageData };
let { data }: Props = $props();
</script>

<div class="container">
  <Table.Root>
    <Table.Caption>Simple list of ingredients</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[40px]" />
        <Table.Head class="w-[100px]">Id</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head>kcal</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.ingredients as ingredient (ingredient.id)}
        <Table.Row>
          <Table.Cell>
            <form action="?/deleteIngredient&id={ingredient.id}" method="post">
              <Button type="submit">Delete</Button>
            </form>
          </Table.Cell>
          <Table.Cell>{ingredient.id}</Table.Cell>
          <Table.Cell>{ingredient.name}</Table.Cell>
          <Table.Cell>{ingredient.kcal}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
