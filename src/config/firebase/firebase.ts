import { User, ConfirmationResult } from "firebase/auth";

export * from "./base";

export type FirebaseAuthUser = User;

export const Auth = {
  verifyOTP: async (_: string, __: ConfirmationResult | string) => {},
  onAuthStateChanged: (_: (user: FirebaseAuthUser) => void) => {},
  sendPhoneOTP: async (_: string) => {},
  updateEmail: async (_: string) => {},
  currentUser: {} as FirebaseAuthUser,
  signOut: async () => {},
};
