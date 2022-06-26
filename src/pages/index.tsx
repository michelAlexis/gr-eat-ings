import Layout from '@/components/Layout';
import CreateIngredientForm from '../components/ingredients/Ingredient.form';

const IndexPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex flex-col items-center">
        <div className="mb-3 min-w-[600px]">
          <h2 className="text-2xl">Formulaire</h2>
          <CreateIngredientForm></CreateIngredientForm>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
