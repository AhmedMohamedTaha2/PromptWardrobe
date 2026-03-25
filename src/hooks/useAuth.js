import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { ensureProfileExists } from "../lib/profile";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadSession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!isMounted) return;
        setSession(data.session);
      } catch (err) {
        if (!isMounted) return;
        setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const syncProfile = async () => {
      if (!session?.user) return;
      try {
        await ensureProfileExists(session.user);
      } catch (err) {
        if (!isMounted) return;
        setError((prev) => prev ?? err);
      }
    };

    syncProfile();

    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  const signIn = useCallback(async ({ email, password }) => {
    setError(null);
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email,
        password,
      },
    );
    if (signInError) throw signInError;
    if (data?.user) {
      await ensureProfileExists(data.user);
    }
  }, []);

  const signUp = useCallback(async ({ email, password }) => {
    setError(null);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) throw signUpError;
    if (data?.user) {
      await ensureProfileExists(data.user);
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) throw signOutError;
  }, []);

  const getCurrentUser = useCallback(async () => {
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    return data.user;
  }, []);

  return useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      error,
      signIn,
      login: signIn,
      signUp,
      signOut,
      logout: signOut,
      getCurrentUser,
    }),
    [session, loading, error, signIn, signUp, signOut, getCurrentUser],
  );
}
