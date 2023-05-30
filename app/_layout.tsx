import { Slot } from "expo-router";
import { AuthProvider } from "contexts";

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
