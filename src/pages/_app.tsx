import type { AppRouter } from '@/backend/router/router';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import '../styles/index.css';

// Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
    };
  },
  ssr: true,
})(MyApp);