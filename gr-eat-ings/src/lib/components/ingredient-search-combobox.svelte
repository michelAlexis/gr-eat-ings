<script lang="ts">

  interface Ingredient {
    id: number;
    label: string;
  }
  interface Props {
    value?: Ingredient | null;
  }

  let {
    value = $bindable(),
  }: Props = $props();

</script>

Hello
