import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Handles email confirmation and password-reset redirect links
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get("code");
  const next  = searchParams.get("next") ?? "/dashboard";
  const type  = searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Password reset — send to a dedicated page so the user can set a new password
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/reset-password`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong — land back on login with an error flag
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
