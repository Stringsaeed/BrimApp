import auth from "@react-native-firebase/auth";

import { Analytics } from "services/analytics";
import { IAuthService } from "types";

export const Auth: IAuthService = {
  verifyOTP: async (code, verificationId) => {
    const credentials = await auth().signInWithCredential(
      auth.PhoneAuthProvider.credential(verificationId, code)
    );

    if (credentials.user) {
      Analytics.identify(credentials.user);
    }
    return;
  },
  sendPhoneOTP: (phoneNumber) => {
    if (__DEV__) {
      auth().settings.appVerificationDisabledForTesting = false;
    }
    return auth().signInWithPhoneNumber(phoneNumber);
  },
  onAuthStateChanged: (callback) => {
    return auth().onAuthStateChanged(callback);
  },
  updateEmail: (email: string) =>
    auth().currentUser?.verifyBeforeUpdateEmail(email),
  getCurrentUser: () => auth().currentUser,
  currentUser: auth().currentUser,
  signOut: () => auth().signOut(),
};
