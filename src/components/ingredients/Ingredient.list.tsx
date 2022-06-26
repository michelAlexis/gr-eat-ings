import { trpc } from '@/utils/trpc';
import { FC } from 'react';

interface Props {}

export const IngredientList: FC<Props> = () => {
  const { data, isLoading, refetch } = trpc.useQuery(['get-ingredients']);

  const deleteIngredient = trpc.useMutation('delete-ingredient');

  const onDetele = async (id: string) => {
    await deleteIngredient.mutateAsync({ id });
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <>
        {data.map((ing, i) => (
          <div key={i} className="flex justify-between p-1 hover:bg-slate-500">
            <span className="pr-2">{ing.name}</span>
            <button type="button" onClick={() => onDetele(ing.id)}>
              delete
            </button>
          </div>
        ))}
      </>
    );
  }
  return <div>List</div>;
};

export default IngredientList;
