"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-200/50 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-black/20">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
