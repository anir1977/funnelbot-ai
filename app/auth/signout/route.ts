import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", request.url), {
    status: 303, // Turn the POST into a GET so the browser doesn't re-submit.
  });
}
