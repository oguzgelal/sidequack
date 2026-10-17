import type { ReactNode } from "react";
import { Head } from "@inertiajs/react";

export function PageLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-svh items-center justify-center pt-[max(--spacing(4),env(safe-area-inset-top))] pr-[max(--spacing(4),env(safe-area-inset-right))] pb-[max(--spacing(4),env(safe-area-inset-bottom))] pl-[max(--spacing(4),env(safe-area-inset-left))]">
      <Head title={title} />
      {children}
    </main>
  );
}
