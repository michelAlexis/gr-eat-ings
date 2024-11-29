<script lang="ts">
import { page } from '$app/stores';
import { cn } from '$lib/utils';
import { fromStore } from 'svelte/store';
import LogOut from 'lucide-svelte/icons/log-out';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import type { SessionUser } from '$lib/server/auth';
import { enhance } from '$app/forms';

interface Props {
    user: SessionUser | null;
}
const { user }: Props = $props();
const userInitial = $derived(user ? user.username.substring(0, 2) : null);
const pageState = fromStore(page);

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Lucia demo', href: '/demo/lucia/login' },
    { label: 'Create ingredient', href: '/ingredients/create' },
];
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
          item.href === pageState.current.url.pathname && "text-foreground",
        )}>{item.label}</a
      >
    {/each}
  </nav>

  <div class="flex-1">
    {#if user}
      <DropdownMenu>
        <DropdownMenuTrigger class="float-right">
          <Avatar>
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <form method="post" action="/demo/lucia?/logout" use:enhance>
              <button class="flex items-center gap-2">
                <LogOut class="size-4" />
                <span>Logout</span>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    {:else}
      <a
        class={cn(buttonVariants({ variant: "link" }), "float-right")}
        href="/demo/lucia">Login</a
      >
    {/if}
  </div>
</header>
