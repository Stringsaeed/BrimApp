import auth from "@react-native-firebase/auth";

import { IAuthService } from "types";

export const Auth: IAuthService = {
  verifyOTP: async (code, verificationId) => {
    await auth().signInWithCredential(
      auth.PhoneAuthProvider.credential(verificationId, code)
    );
    return;
  },
  sendPhoneOTP: (phoneNumber) => {
    if (__DEV__) auth().settings.appVerificationDisabledForTesting = true;
    return auth().signInWithPhoneNumber(phoneNumber);
  },
  onAuthStateChanged: (callback) => {
    return auth().onAuthStateChanged(callback);
  },
  updateEmail: (email: string) =>
    auth().currentUser?.verifyBeforeUpdateEmail(email),
  currentUser: auth().currentUser,
  signOut: () => auth().signOut(),
};
