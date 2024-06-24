import type { Session, SupabaseClient, User } from '@supabase/ssr';

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient;
            safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
        }
        interface PageData {
            session: Session | null;
            user: User | null;
        }
        // interface Error {}
        // interface Platform {}
    }
}
