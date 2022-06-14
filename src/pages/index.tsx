import { Auth } from '@aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Ingredient, ListIngredientsQuery } from '../../src/API';
import { listIngredients } from '../../src/graphql/queries';
import CreateIngredientForm from '../components/ingredients/Ingredient.form';
import Layout from '../components/Layout';
import AwsClient from '../services/aws-client';

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
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    AwsClient.query<ListIngredientsQuery>({
      query: gql(listIngredients),
    }).then(({ data }) => {
      console.log('ingredients', data.listIngredients?.items);
      if (data.listIngredients?.items) {
        setIngredients(data.listIngredients.items as Ingredient[]);
      }
    });
  }, []);

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
        <ul>
          {ingredients.map((e) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Formulaire</h2>
        <CreateIngredientForm></CreateIngredientForm>
      </div>
    </Layout>
  );
};

export default withAuthenticator(IndexPage);
// export default IndexPage;
