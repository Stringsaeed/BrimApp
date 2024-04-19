import {
  AuthError,
  AuthOtpResponse,
  AuthResponse,
  Session,
  User,
} from "@supabase/supabase-js";
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import supabaseClient from "services/supabase";

type AuthenticationContextType = {
  user: User | null;
  signInWithOtp: (email: string) => Promise<AuthOtpResponse>;
  verifyOtp: (email: string, otp: string) => Promise<AuthResponse>;
  signOut: () => Promise<{
    error: AuthError | null;
  }>;
  isAuthenticated: boolean;
};

const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null
);

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }

  return context;
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const signInWithOtp = useCallback(async (email: string) => {
    return await supabaseClient.auth.signInWithOtp({ email });
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    return await supabaseClient.auth.verifyOtp({
      type: "email",
      token: otp,
      email,
    });
  }, []);

  const signOut = useCallback(async () => {
    return await supabaseClient.auth.signOut();
  }, []);

  const authListener = useCallback(() => {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    authListener();
  }, [authListener]);

  const contextValue = useMemo<AuthenticationContextType>(
    () => ({
      isAuthenticated: session !== null,
      user: session?.user ?? null,
      signInWithOtp,
      verifyOtp,
      signOut,
    }),
    [session, signInWithOtp, verifyOtp, signOut]
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}
