import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import { getDefaultLanguage } from "@/lib/config";
import { getUserProfile, putUserProfile, type UserGender } from "@/lib/models";
import { mockUserProfile } from "@/lib/mock-data";

const profileSchema = z.object({
  name: z.string().min(1).max(100),
  gender: z.enum(["male", "female", "neutral"]),
  language: z.string().min(1).max(10),
});

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(mockUserProfile);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(mockUserProfile);
  }

  const profile = await getUserProfile(user.id);
  if (!profile) {
    return NextResponse.json({
      userId: user.id,
      name: "",
      gender: "neutral",
      language: getDefaultLanguage().code,
      updatedAt: "",
    });
  }

  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Сервис недоступен" }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = profileSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, gender, language } = parsed.data;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const profile = await putUserProfile({
    userId: user.id,
    name,
    gender: gender as UserGender,
    language,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json(profile);
}
