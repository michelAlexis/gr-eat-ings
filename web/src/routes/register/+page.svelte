<script lang="ts">
import { authClient } from '$lib/client/auth';
import { Button } from '$lib/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '$lib/components/ui/card';
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';

let email = $state('');
let name = $state('');
let password = $state('');
let loading = $state(false);
let errorMessage = $state<string>();

async function register(event: SubmitEvent) {
    loading = true;
    event.stopPropagation();
    event.preventDefault();
    const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/',
    });
    loading = false;
    errorMessage = error?.message;
    if (!error) {
        location.reload();
    }
}
</script>

<div class="pt-20 flex items-center justify-center bg-background">
	<Card class="w-full max-w-md">
		<form onsubmit={register}>
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl font-bold">
					Welcome !
				</CardTitle>
				<CardDescription>
					Enter your email and password to create
					your account
				</CardDescription>
			</CardHeader>

			<CardContent class="space-y-4">
				{#if errorMessage}
					<p
						class="text-destructive font-semibold text-sm"
					>
						{errorMessage}
					</p>
				{/if}
				<div class="space-y-2">
					<Label for="name">Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="John Doe"
						bind:value={name}
					/>
				</div>
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="name@example.com"
						bind:value={email}
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						type="password"
						placeholder="Enter your password"
						bind:value={password}
					/>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					class="w-full"
					type="submit"
					disabled={loading}
				>
					Sign up
				</Button>
			</CardFooter>
		</form>
	</Card>
</div>
