import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";
import React from "react";

type AuthContext =
  | {
      isAuthenticated: true;
      user: FirebaseAuthTypes.User;
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

function useProtectedRoute(user?: AuthContext["user"]) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const isProtectedRoute = segments[0] === "auth";

    if (!isProtectedRoute && !user) {
      router.replace("/auth/login");
    } else if (user && isProtectedRoute) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(
    () => auth().currentUser
  );
  const isAuthenticated = !!user;

  useProtectedRoute(user);

  const listener = React.useCallback(() => {
    auth().onAuthStateChanged((user) => {
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
