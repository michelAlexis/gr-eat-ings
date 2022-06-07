import { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';
// FIXME: There should be a better way to import the css
import '../../node_modules/@aws-amplify/ui-react/dist/styles.css';
import { Amplify } from '@aws-amplify/core';
import awsconfig from '../../aws-exports';


import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

export function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withAuthenticator(MyApp as any);
