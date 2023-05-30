import { User, ConfirmationResult } from "firebase/auth";
export * from "./base";

export type FirebaseAuthUser = User;

export const Auth = {
  sendPhoneOTP: async (phoneNumber: string) => {},
  verifyOTP: async (
    code: string,
    confirmationResultOrVerificationId: ConfirmationResult | string
  ) => {},
  onAuthStateChanged: (callback: (user: FirebaseAuthUser) => void) => {},
  currentUser: {} as FirebaseAuthUser,
};
