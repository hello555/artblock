// src/app/hooks/useUserSession.ts

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export function useUserSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }

      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
