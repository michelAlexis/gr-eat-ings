import { type AppRouter } from '@/backend/router/router';
import { createReactQueryHooks, createTRPCClient } from '@trpc/react';

export const trpc = createReactQueryHooks<AppRouter>();

export const client = createTRPCClient<AppRouter>({
  url: getTrpcUrl(),
});

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export function getTrpcUrl() {
  return `${getBaseUrl()}/api/trpc`;
}
