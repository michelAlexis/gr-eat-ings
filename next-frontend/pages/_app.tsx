import { AppProps } from 'next/app';
import React from 'react';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
