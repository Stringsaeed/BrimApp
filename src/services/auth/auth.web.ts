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

// @ts-expect-error
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {},
  auth
);

export const Auth: IAuthService = {
  sendPhoneOTP: (phoneNumber) => {
    if (__DEV__) auth.settings.appVerificationDisabledForTesting = true;

    return signInWithPhoneNumber(
      auth,
      phoneNumber,
      // @ts-expect-error
      window.recaptchaVerifier
    );
  },
  verifyOTP: async (code, verificationId) => {
    if (typeof verificationId !== "string") return;

    const credential = PhoneAuthProvider.credential(verificationId, code);

    await signInWithCredential(auth, credential);
    return;
  },
  updateEmail: async (email) => {
    if (!auth.currentUser) return;
    verifyBeforeUpdateEmail(auth.currentUser, email);
  },
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },
  signOut: () => auth.signOut(),
  currentUser: auth.currentUser,
};
