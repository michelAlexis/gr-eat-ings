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
import { Checkbox } from '$lib/components/ui/checkbox';
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';

let email = $state('');
let password = $state('');
let rememberMe = $state(false);
let loading = $state(false);

async function login(event: SubmitEvent) {
    loading = true;
    event.stopPropagation();
    event.preventDefault();
    const { data, error } = await authClient.signIn.email(
        {
            email,
            password,
            rememberMe,
            callbackURL: '/',
        },
        {
            onRequest: (ctx) => {
                loading = false;
                console.log('onRequest', ctx);
            },
            onSuccess: (ctx) => {
                console.log('onSuccess', ctx);
            },
            onError: (ctx) => {
                loading = false;
                console.log('onError', ctx);
            },
        },
    );
    console.log(data, error);
}
</script>

<div class="pt-20 flex items-center justify-center bg-background">
	<Card class="w-full max-w-md">
		<form onsubmit={login}>
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl font-bold">
					Welcome back
				</CardTitle>
				<CardDescription>
					Enter your email and password to login
					to your account
				</CardDescription>
			</CardHeader>

			<CardContent class="space-y-4">
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

				<div class="flex items-center space-x-2">
					<Checkbox
						id="remember"
						bind:checked={rememberMe}
					/>
					<Label for="remember" class="text-sm">
						Remember me
					</Label>
				</div>
			</CardContent>

			<CardFooter>
				<Button class="w-full" type="submit" disabled={loading}>
					Sign in
				</Button>
			</CardFooter>
		</form>
	</Card>
</div>
