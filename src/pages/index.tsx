import { Layout } from '@/components/layout';

const IndexPage = () => {
  return (
    <Layout title="Gr-eat-ings">
      <div className="flex flex-col items-center">
        <div className="mb-3 min-w-[600px]">
          <h2 className="text-2xl">Welcome to Gr-eat-ings !</h2>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
