// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

Deno.serve(async (req: Request) => {
  // プリフライトリクエストの場合
  // if (req.method === 'OPTIONS') {
  //   return new Response('ok', { headers: corsHeaders });
  // }

  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response('key not found', { status: 500 });
    }
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const res = await supabaseClient.auth.getUser(token);
    const user = res.data?.user;
    const { id } = user;

    const { id: idFromRequest } = await req.json();

    if (id !== idFromRequest) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { error: deleteError } =
      await supabaseClient.auth.admin.deleteUser(idFromRequest);

    if (deleteError) {
      console.log('error', deleteError);
      return new Response('Internal Server Error', { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
});
