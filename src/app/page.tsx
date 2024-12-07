"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        router.push("/dashboard"); // Redirect if already signed in
      }
    };

    checkUser();
  }, [router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("Error during GitHub login:", error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--foreground)]">
      <h1 className="text-4xl font-light mb-2 text-gray-800">welcome to</h1>
      <h2 className="text-8xl font-bold text-gray-800">artblock</h2>
      <button
        className="mt-6 bg-gray-800 text-white py-2 px-4 rounded border-2 border-gray-800 font-bold hover:bg-white hover:text-gray-800 hover:border-gray-800 transition"
        onClick={handleLogin}
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
