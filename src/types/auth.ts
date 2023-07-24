export interface AuthUser {
  /**
   * The user's display name (if available).
   */
  displayName: string | null;
  /**
   * - The user's email address (if available).
   */
  email: string | null;
  /**
   * - True if the user's email address has been verified.
   */
  emailVerified: boolean;
  /**
   * Returns true if the user is anonymous; that is, the user account was created with
   * {@link auth#signInAnonymously} and has not been linked to another account
   * with {@link auth#linkWithCredential}.
   */
  isAnonymous: boolean;

  /**
   * Returns the phone number of the user, as stored in the Firebase project's user database,
   * or null if none exists. This can be updated at any time by calling {@link auth.User#updatePhoneNumber}.
   */
  phoneNumber: string | null;

  /**
   * The URL of the user's profile picture (if available).
   */
  photoURL: string | null;

  /**
   *  The authentication provider ID for the current user.
   *  For example, 'facebook.com', or 'google.com'.
   */
  providerId: string;

  /**
   *  - The user's unique ID.
   */
  uid: string;
}

export interface ConfirmationResult {
  verificationId: string | null;
}

export interface IAuthService {
  verifyOTP: (code: string, verificationId: string) => Promise<void>;
  onAuthStateChanged: (callback: (user: AuthUser | null) => void) => void;
  sendPhoneOTP: (phoneNumber: string) => Promise<ConfirmationResult>;
  updateEmail: (email: string) => void;
  currentUser: AuthUser | null;
  signOut: () => Promise<void>;
}
