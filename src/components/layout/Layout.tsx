import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="ml-4 mt-2">
        <Link href="/">
          <a>Home</a>
        </Link>

        <span className="mx-4">|</span>
        <Link href="/ingredients">
          <a>Ingredients</a>
        </Link>

        <span className="mx-4">|</span>
        <Link href="/ingredients/create">
          <a>Create ingredient</a>
        </Link>

        <span className="mx-4">|</span>
        <Link href="/ingredients/calculator">
          <a>Calculator</a>
        </Link>

        <span className="mx-4">|</span>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </>
);

export default Layout;
