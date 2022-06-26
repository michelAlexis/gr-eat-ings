import type { AppRouter } from '@/backend/router/router';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';
import '../styles/index.css';

// Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/trpc` : 'http://localhost:3000/api/trpc';
    return {
      url,
    };
  },
  ssr: true,
})(MyApp);
