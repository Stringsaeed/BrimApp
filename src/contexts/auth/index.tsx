import { useRouter, useSegments } from "expo-router";
import React from "react";

import { Auth } from "services";
import { AuthUser } from "types";

type AuthContext =
  | {
      isAuthenticated: true;
      user: AuthUser;
    }
  | {
      isAuthenticated: false;
      user: null;
    };

const authContext = React.createContext<AuthContext | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function useFirstRender() {
  const ref = React.useRef(true);

  React.useEffect(() => {
    ref.current = false;
  }, []);

  return ref.current;
}

function useProtectedRoute(user?: AuthContext["user"]) {
  const segments = useSegments();
  const router = useRouter();
  const isFirstRender = useFirstRender();

  React.useEffect(() => {
    if (isFirstRender) return;
    const isProtectedRoute = segments[0] === "auth";

    if (!isProtectedRoute && !user) {
      router.replace("/auth/login");
    } else if (user && isProtectedRoute) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments, isFirstRender]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(() =>
    Auth.getCurrentUser()
  );
  const isAuthenticated = !!user;

  useProtectedRoute(user);

  const listener = React.useCallback(() => {
    Auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  React.useEffect(() => {
    listener();
  }, [listener]);

  const contextValue = React.useMemo<AuthContext>(() => {
    if (isAuthenticated) {
      return { isAuthenticated, user: user! };
    } else {
      return { isAuthenticated, user: null };
    }
  }, [isAuthenticated, user]);

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
}
