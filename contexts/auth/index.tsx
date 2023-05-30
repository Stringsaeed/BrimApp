import React from "react";
import { useRouter, useSegments } from "expo-router";

export interface User {}

interface AuthContext {
  user?: User | undefined;

  signIn: (user: User) => void;
  signOut: () => void;
}

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

  console.log("isProtectedRoute", user);

  React.useEffect(() => {
    const isProtectedRoute = segments[0] === "(auth)";

    if (!isProtectedRoute && !user) {
      router.replace("/login");
    } else if (user && isProtectedRoute) {
      router.replace("/");
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  useProtectedRoute(user);

  const contextValue = React.useMemo<AuthContext>(
    () => ({
      user,
      signIn: setUser,
      signOut: () => {
        setUser(undefined);
      },
    }),
    [user]
  );

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
}
