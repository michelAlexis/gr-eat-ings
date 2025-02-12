import { createAuthClient } from "better-auth/svelte";
import * as env from "$env/static/public";

export const authClient = createAuthClient({
    baseURL: env.PUBLIC_BASE_URL,
});
