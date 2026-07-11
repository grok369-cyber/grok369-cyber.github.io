import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="rounded-3xl border border-zinc-200 bg-white p-12 shadow-lg shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-black/20">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          You are signed in with Clerk. This page is protected by server-side auth.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
