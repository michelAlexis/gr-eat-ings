import SearchBar, { OnAddParams } from '@/components/ingredients/calculator/search-bar';
import { NewIngredientCalculatorTable } from '@/components/ingredients/calculator/table';
import { Layout } from '@/components/layout';
import { IngredientDetail, Quantity } from '@/models/ingredient.model';
import { computeMultiplier, getDefaultQuantity } from '@/utils/ingredient.utils';
import { client } from '@/utils/trpc';
import { NextPage } from 'next';
import { useState } from 'react';

export const IndexPage: NextPage = () => {
  const [list, setList] = useState<{ ingredient: IngredientDetail; multiplier: number; quantity: Quantity }[]>([]);
  const onAdd = async (v: OnAddParams) => {
    const data = await client.query('ingredients.by-id', { id: v.id });

    const refQuantity = { quantity: getDefaultQuantity(data.unitRef), unit: data.unitRef };
    const multiplier = computeMultiplier(refQuantity, v.quantity);
    list.push({ ingredient: data, multiplier, quantity: v.quantity });
    setList([...list]);
  };

  const onRemove = (id: string) => {
    const litered = list.filter((i) => i.ingredient.id !== id);
    setList(litered);
  };

  const onUpdate = (rowIndex: number, quantity: number) => {
    setList((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            quantity: { ...row.quantity, quantity },
          };
        }
        return row;
      })
    );
  };

  return (
    <Layout title="Calculator">
      <>
        <div className="w-4/5 m-auto mb-5">
          <SearchBar onAdd={onAdd} exclude={list.map((i) => i.ingredient.id)}></SearchBar>
        </div>
        <NewIngredientCalculatorTable data={list} onRemove={onRemove} onQuantityUpdate={onUpdate} />
      </>
    </Layout>
  );
};

export default IndexPage;
