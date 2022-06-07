import { Amplify } from '@aws-amplify/core';
import { AppProps } from 'next/app';
import React from 'react';
import awsconfig from '../aws-exports';
// FIXME: There should be a better way to import the css
import '../../node_modules/@aws-amplify/ui-react/dist/styles.css';
import '../styles/index.css';

Amplify.configure(awsconfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
