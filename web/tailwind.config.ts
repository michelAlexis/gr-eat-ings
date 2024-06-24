import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { yummy } from './src/yummy';

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
    ],
    theme: {
        extend: {
            container: { center: true },
        },
    },
    plugins: [
        forms,
        typography,
        skeleton({
            themes: {
                custom: [yummy],
            },
        }),
    ],
} satisfies Config;
