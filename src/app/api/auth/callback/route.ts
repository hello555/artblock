import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(req: Request) {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
