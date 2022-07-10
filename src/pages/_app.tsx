import type { AppRouter } from '@/backend/router/router';
import { getTrpcUrl } from '@/utils/trpc';
import { withTRPC } from '@trpc/next';
import { AppProps } from 'next/app';

import '@/styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url: getTrpcUrl(),
    };
  },
  ssr: true,
})(MyApp);
