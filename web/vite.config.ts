import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

import type { Plugin } from 'vite';

// Related issues
// https://github.com/supabase/auth-js/issues/888
// https://github.com/supabase/auth-js/issues/912
// https://github.com/supabase/auth-js/issues/873
// https://stackoverflow.com/questions/78297790/using-supabase-auth-getsession-is-potentially-insecure
export function myErrorFilterPlugin(): Plugin {
    return {
        name: 'error-filter-plugin',
        configureServer() {
            const filterMessage = 'Using supabase.auth.getSession() is potentially insecure';
            // Intercept console.warn
            const originalWarn = console.warn;
            console.warn = (...args) => {
                if (args[0] && typeof args[0] === 'string' && args[0].startsWith(filterMessage)) {
                    return;
                }
                originalWarn(...args);
            };

            // Intercept console.log
            const originalLog = console.log;
            console.log = (...args) => {
                if (args[0] && typeof args[0] === 'string' && args[0].startsWith(filterMessage)) {
                    return;
                }
                originalLog(...args);
            };
        },
    };
}

export default defineConfig({
    plugins: [sveltekit(), purgeCss(), myErrorFilterPlugin()],
});
