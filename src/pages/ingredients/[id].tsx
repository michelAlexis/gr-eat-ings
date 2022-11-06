import { prisma } from '@/backend/utils/prisma';
import { Layout } from '@/components/layout';
import { AsyncReturnType } from '@/utils/ts.utils';
import { GetServerSideProps, NextPage } from 'next';

const getIngredientDetail = async (id: string) => {
  return await prisma.ingredient.findUnique({
    rejectOnNotFound: true,
    where: {
      id,
    },
  });
};

type IngredientDetail = AsyncReturnType<typeof getIngredientDetail>;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  if (!id || Array.isArray(id)) {
    throw new Error('Missing ingredient id param');
  }

  const ingredient = await getIngredientDetail(id);

  return { props: { ingredient } };
};

export const IngredientDetailPage: NextPage<{ ingredient: IngredientDetail }> = ({ ingredient }) => {
  if (!ingredient) {
    return (
      <Layout title="Ingredients">
        <div className="flex flex-col items-center">
          <div className="min-w-[600px]">
            <h2 className="text-2xl">No ingredient found</h2>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout title={ingredient.name}>
      <div className="flex flex-col">
        <div className="min-w-[600px]">
          <h2 className="text-2xl">{ingredient.name}</h2>
        </div>
        <div>
          <span className="font-bold">Kcal</span> : {ingredient.kcal}
        </div>
      </div>
    </Layout>
  );
};

export default IngredientDetailPage;
