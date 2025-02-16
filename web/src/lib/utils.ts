import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

export function findErrorMesssage(err: unknown): string | null {
    if (typeof err === 'string') return err;
    if (err && err instanceof Error) return err.message;
    if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string')
        return err.message;
    return null;
}
