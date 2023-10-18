import auth from "@react-native-firebase/auth";
import { Platform } from "react-native";

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
    auth().settings.appVerificationDisabledForTesting = __DEV__;
    auth().settings.forceRecaptchaFlowForTesting = Platform.OS === "android";
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
