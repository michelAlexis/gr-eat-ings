import type { AppRouter } from '@/backend/router/router';
import type { inferProcedureOutput, inferProcedureInput, inferSubscriptionOutput } from '@trpc/server';
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

// TYPES source: https://trpc.io/docs/infer-types

/**
 * Enum containing all api query paths
 */
export type TQuery = keyof AppRouter['_def']['queries'];

/**
 * Enum containing all api mutation paths
 */
export type TMutation = keyof AppRouter['_def']['mutations'];

/**
 * Enum containing all api subscription paths
 */
export type TSubscription = keyof AppRouter['_def']['subscriptions'];

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = InferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

/**
 * This is a helper method to infer the input of a query resolver
 * @example type HelloInput = InferQueryInput<'hello'>
 */
export type InferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

/**
 * This is a helper method to infer the output of a mutation resolver
 * @example type HelloOutput = InferMutationOutput<'hello'>
 */
export type InferMutationOutput<TRouteKey extends TMutation> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

/**
 * This is a helper method to infer the input of a mutation resolver
 * @example type HelloInput = InferMutationInput<'hello'>
 */
export type InferMutationInput<TRouteKey extends TMutation> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;

/**
 * This is a helper method to infer the output of a subscription resolver
 * @example type HelloOutput = InferSubscriptionOutput<'hello'>
 */
export type InferSubscriptionOutput<TRouteKey extends TSubscription> = inferProcedureOutput<AppRouter['_def']['subscriptions'][TRouteKey]>;

/**
 * This is a helper method to infer the asynchronous output of a subscription resolver
 * @example type HelloAsyncOutput = InferAsyncSubscriptionOutput<'hello'>
 */
export type InferAsyncSubscriptionOutput<TRouteKey extends TSubscription> = inferSubscriptionOutput<AppRouter, TRouteKey>;

/**
 * This is a helper method to infer the input of a subscription resolver
 * @example type HelloInput = InferSubscriptionInput<'hello'>
 */
export type InferSubscriptionInput<TRouteKey extends TSubscription> = inferProcedureInput<AppRouter['_def']['subscriptions'][TRouteKey]>;
