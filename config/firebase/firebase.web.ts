import {
  User,
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { app } from "./base";

export * from "./base";

export type FirebaseAuthUser = User;

const auth = getAuth(app);
auth.languageCode = "en";

// @ts-expect-error
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {},
  auth
);

export const Auth = {
  sendPhoneOTP: (phoneNumber: string) => {
    // @ts-expect-error
    return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
  },
  verifyOTP: (code: string, verificationId: string) => {
    const credential = PhoneAuthProvider.credential(verificationId, code);

    return signInWithCredential(auth, credential);
  },
  onAuthStateChanged: (callback: (user: FirebaseAuthUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },
  currentUser: auth.currentUser,
};
