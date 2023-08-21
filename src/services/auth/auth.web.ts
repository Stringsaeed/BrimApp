import {
  PhoneAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPhoneNumber,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import { auth } from "config";
import { IAuthService } from "types";

auth.languageCode = "en";

export const Auth: IAuthService = {
  verifyOTP: async (code, verificationId) => {
    if (typeof verificationId !== "string") return;
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential);
    return;
  },
  sendPhoneOTP: (phoneNumber) => {
    if (__DEV__) auth.settings.appVerificationDisabledForTesting = true;

    return signInWithPhoneNumber(
      auth,
      phoneNumber,
      // @ts-ignore
      window.recaptchaVerifier
    );
  },
  updateEmail: async (email) => {
    if (!auth.currentUser) return;
    verifyBeforeUpdateEmail(auth.currentUser, email);
  },
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
  getCurrentUser: () => auth.currentUser,
  currentUser: auth.currentUser,
  signOut: () => auth.signOut(),
};
