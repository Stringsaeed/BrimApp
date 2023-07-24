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
  updateEmail: (email: string) =>
    auth().currentUser?.verifyBeforeUpdateEmail(email),
  currentUser: auth().currentUser,
  signOut: () => auth().signOut(),
};

export type FirebaseAuthUser = FirebaseAuthTypes.User;
