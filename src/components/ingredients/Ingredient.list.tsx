import { trpc } from '@/utils/trpc';
import { FC, useState } from 'react';
import { IngredientAutocomplete } from './IngredientSearch.autocomplete';
import { IngredientDetail } from './IngredientDetail';

interface Props {}

export const IngredientList: FC<Props> = () => {
  const { data, isLoading, refetch } = trpc.useQuery(['ingredients.all']);

  const deleteIngredient = trpc.useMutation('ingredients.delete');

  const onDetele = async (id: string) => {
    await deleteIngredient.mutateAsync({ id });
    refetch();
  };

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <section className="mb-3">
        <h2>Search</h2>
        <IngredientAutocomplete onChange={setSelected}></IngredientAutocomplete>
      </section>
      {selected && (
        <section className="mb-3">
          <h2>Detail</h2>
          <IngredientDetail id={selected}></IngredientDetail>
        </section>
      )}
      <section className="mb-3">
        <h2>List</h2>
        {isLoading && <div>Loading...</div>}
        {data?.map((ing, i) => (
          <div key={i} className="flex justify-between p-1 hover:bg-slate-500">
            <span className="pr-2">{ing.name}</span>
            <button type="button" onClick={() => onDetele(ing.id)}>
              delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default IngredientList;
