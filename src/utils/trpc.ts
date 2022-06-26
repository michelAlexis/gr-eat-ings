import { AppRouter } from '@/backend/router/router';
import { createReactQueryHooks } from '@trpc/react';

export const trpc = createReactQueryHooks<AppRouter>();
