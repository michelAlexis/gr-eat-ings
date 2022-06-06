import { Auth } from '@aws-amplify/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

// Amplify.configure(awsconfig);

const IndexPage = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    (async () => {
      const current = await Auth.currentUserInfo();
      console.log(current);
      setUser(current.attributes.email);
    })();
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
    </Layout>
  );
};

// export default withAuthenticator(IndexPage);
export default IndexPage;
