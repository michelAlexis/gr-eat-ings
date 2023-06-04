import IngredientList from '@/components/ingredients/Ingredient.list';
import { Layout } from '@/components/layout';
import { NextPage } from 'next';

export const IndexPage: NextPage = () => {
  return (
    <Layout title="Ingredients">
      <div className="flex flex-col items-center">
        <div className="min-w-[600px]">
          <h2 className="text-2xl">Ingredients</h2>
          <IngredientList></IngredientList>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
