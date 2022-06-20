import { Amplify } from '@aws-amplify/core';
import '@aws-amplify/ui-react/styles.css';
import { AppProps } from 'next/app';
import awsconfig from '../aws-exports';
import '../styles/index.css';

Amplify.configure(awsconfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
