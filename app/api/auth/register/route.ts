import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(72),
});

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Аутентификация не настроена" },
      { status: 503 }
    );
  }

  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user }, { status: 201 });
}
