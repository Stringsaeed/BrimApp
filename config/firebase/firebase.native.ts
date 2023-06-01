import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export * from "./base";

export const Auth = {
  sendPhoneOTP: (phoneNumber: string) => {
    return auth().signInWithPhoneNumber(phoneNumber);
  },
  verifyOTP: (
    code: string,
    confirmationResult: FirebaseAuthTypes.ConfirmationResult
  ) => {
    return confirmationResult.confirm(code);
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    return auth().onAuthStateChanged(callback);
  },
  currentUser: auth().currentUser,
  signOut: () => auth().signOut(),
};

export type FirebaseAuthUser = FirebaseAuthTypes.User;
