import { NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import { getUserStreak, putUserStreak } from "@/lib/models";
import { mockUserStreak } from "@/lib/mock-data";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(mockUserStreak);
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
    return NextResponse.json({
      ...mockUserStreak,
      userId: user.id,
    });
  }

  const streak = await getUserStreak(user.id);
  if (!streak) {
    return NextResponse.json({
      userId: user.id,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: "",
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json(streak);
}

export async function POST() {
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

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const now = new Date().toISOString();

  const existing = await getUserStreak(user.id);

  if (!existing) {
    const newStreak = {
      userId: user.id,
      currentStreak: 1,
      longestStreak: 1,
      lastActivityDate: today,
      updatedAt: now,
    };
    await putUserStreak(newStreak);
    return NextResponse.json(newStreak);
  }

  if (existing.lastActivityDate === today) {
    return NextResponse.json(existing);
  }

  const yesterday = new Date(today + "T00:00:00Z");
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const isConsecutive = existing.lastActivityDate === yesterdayStr;

  const currentStreak = isConsecutive ? existing.currentStreak + 1 : 1;
  const longestStreak = Math.max(existing.longestStreak, currentStreak);

  const updated = {
    ...existing,
    currentStreak,
    longestStreak,
    lastActivityDate: today,
    updatedAt: now,
  };

  await putUserStreak(updated);
  return NextResponse.json(updated);
}
