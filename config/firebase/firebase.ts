import { User, ConfirmationResult } from "firebase/auth";

export * from "./base";

export type FirebaseAuthUser = User;

export const Auth = {
  sendPhoneOTP: async (_: string) => {},
  verifyOTP: async (_: string, __: ConfirmationResult | string) => {},
  onAuthStateChanged: (_: (user: FirebaseAuthUser) => void) => {},
  currentUser: {} as FirebaseAuthUser,
  signOut: async () => {},
};
