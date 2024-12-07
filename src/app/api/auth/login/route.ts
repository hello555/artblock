import { supabase } from '@/app/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
        return NextResponse.json(
            { error: "Supabase URL is not defined in environment variables." },
            { status: 500 }
        );
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${supabaseUrl}/auth/v1/callback`,
        },
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(data.url);
}
