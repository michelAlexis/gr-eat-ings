import type { ListIngredientsQuery } from '@/API';
import Layout from '@/components/Layout';
import { listIngredients } from '@/graphql/queries';
import { useQuery } from '@/utils/aws-utils';
import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CreateIngredientForm from '../components/ingredients/Ingredient.form';

const IndexPage = () => {
  // User
  const [user, setUser] = useState('');
  useEffect(() => {
    (async () => {
      const current = await Auth.currentUserInfo();
      console.log(current);
      setUser(current.attributes.email);
    })();
  }, []);

  // ingredients
  const { data, error, loading, refetch } = useQuery<ListIngredientsQuery>(listIngredients);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <p>Hello {user}</p>

      <div>
        <h2>Ingreditents:</h2>

        {loading && <span>Loading...</span>}
        {error && <span>Error : {error}</span>}

        {data?.listIngredients?.items && <ul>{data.listIngredients?.items.map((e) => e && <li key={e.id}>{e.name}</li>)}</ul>}
      </div>

      <div>
        <h2>Formulaire</h2>
        <CreateIngredientForm onCreate={() => refetch()}></CreateIngredientForm>
      </div>
    </Layout>
  );
};

export default withAuthenticator(IndexPage);
// export default IndexPage;
