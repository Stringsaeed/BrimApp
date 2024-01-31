import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum Routes {
  Login = "Login",
  Verify = "Verify",
  Dashboard = "Dashboard",
  Note = "Note",
  Archive = "Archive",
  Trash = "Trash",
  Profile = "Profile",
  AccountInfo = "AccountInfo",
  Preferences = "Preferences",
}

export type RootStackParamList = {
  [Routes.Login]: undefined;
  [Routes.Verify]: { verificationId: string };
  [Routes.Dashboard]: undefined;
  [Routes.Note]: { id: string };
  [Routes.Archive]: undefined;
  [Routes.Trash]: undefined;
  [Routes.Profile]: undefined;
  [Routes.AccountInfo]: undefined;
  [Routes.Preferences]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
