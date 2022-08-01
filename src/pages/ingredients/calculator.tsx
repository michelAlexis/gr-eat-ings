import SearchBar, { OnAddParams } from '@/components/ingredients/calculator/search-bar';
import Table from '@/components/ingredients/calculator/table';
import { Layout } from '@/components/layout';
import { IngredientDetail, Quantity } from '@/models/ingredient.model';
import { getDefaultQuantity, computeMultiplier } from '@/utils/ingredient.utils';
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

  const onUpdate = (rowIndex: number, colId: string, value: any) => {
    setList((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [colId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <Layout title="Calculator">
      <div className="flex flex-col items-center">
        <div className="min-w-[600px] mb-4">
          <h2 className="text-2xl">Calculator</h2>
          <SearchBar onAdd={onAdd}></SearchBar>
          <Table data={list} onRemove={onRemove} onUpdate={onUpdate} />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
