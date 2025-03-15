<script lang="ts">
import { page } from '$app/state';
import { authClient } from '$lib/client/auth';
import type { Session } from '$lib/server/auth';
import { cn } from '$lib/utils';
import LogOut from 'lucide-svelte/icons/log-out';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

interface Props {
    user: Session['user'] | null;
}
const { user }: Props = $props();
const userInitial = $derived.by(() => {
    if (!user) return null;
    const split = user.name.split(' ');
    if (split.length >= 2) {
        return `${split[0][0]}${split[1][0]}`;
    }
    return user.name.substring(0, 2);
});

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'List ingredients', href: '/ingredients' },
    { label: 'Create ingredient', href: '/ingredients/create' },
    { label: 'List recipes', href: '/recipes' },
    { label: 'Create recipe', href: '/recipes/create' },
];

async function signOut() {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => window.location.reload(),
        },
    });
}
</script>

<header class="h-12 shadow-md flex items-center gap-3 px-3 py-2">
  <h1 class="text-xl">
    <span class="">Gr</span>
    <span>-</span>
    <span class="font-bold">eat</span>
    <span>-</span>
    <span>ings</span>
  </h1>

  <Separator orientation="vertical" />

  <nav class="flex items-center gap-6">
    {#each navItems as item}
      <a
        href={item.href}
        class={cn(
          "text-foreground/60 hover:text-foreground/80 transition-colors font-semibold",
          item.href === page.url.pathname && "text-foreground",
        )}>{item.label}</a
      >
    {/each}
  </nav>

  <div class="flex-1 flex items-center justify-end">
    {#if user}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button onclick={signOut} class="flex items-center gap-2">
              <LogOut class="size-4" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    {:else}
      <a class={cn(buttonVariants({ variant: "outline" }))} href="/register">
        Register
      </a>
      <a class={cn(buttonVariants({ variant: "link" }))} href="/login">
        Login
      </a>
    {/if}
  </div>
</header>
