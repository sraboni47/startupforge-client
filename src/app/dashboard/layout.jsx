"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}