import { Layout } from '@/components/layout';
import { NextPage } from 'next';
import { FC } from 'react';

export const CreateRecipePage: NextPage = () => {
  return (
    <Layout title="Create recipe">
      <div className="flex flex-col items-center">
        <div className="min-w-[600px]">
          <h2 className="text-2xl">Recipe</h2>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRecipePage;
