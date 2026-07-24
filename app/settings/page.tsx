import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SettingsForm } from "@/components/settings-form";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Настройки</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Выберите язык для изучения и темы новостей
      </p>
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsForm />
      </Suspense>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-64" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      ))}
      <div className="pt-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64 mt-1" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`cat-${i}`} className="flex items-center gap-3 mt-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
