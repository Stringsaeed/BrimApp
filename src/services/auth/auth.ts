import { IAuthService } from "types";

const NOOP = async () => {};

export const Auth: IAuthService = {
  sendPhoneOTP: async () => {
    return { verificationId: null };
  },
  getCurrentUser: () => {
    return null;
  },
  onAuthStateChanged: NOOP,
  updateEmail: NOOP,
  currentUser: null,
  verifyOTP: NOOP,
  signOut: NOOP,
};