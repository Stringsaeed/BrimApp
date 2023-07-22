import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export * from "./base";

export const Auth = {
  verifyOTP: (
    code: string,
    confirmationResult: FirebaseAuthTypes.ConfirmationResult
  ) => {
    return confirmationResult.confirm(code);
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    return auth().onAuthStateChanged(callback);
  },
  sendPhoneOTP: (phoneNumber: string) => {
    return auth().signInWithPhoneNumber(phoneNumber);
  },
  signOut: () => auth().signOut(),
  currentUser: auth().currentUser,
};

export type FirebaseAuthUser = FirebaseAuthTypes.User;
