import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  console.log('Callback from auth');
  const code = url.searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }
  console.log('No code found, go to account');

  throw redirect(303, '/account')
}
