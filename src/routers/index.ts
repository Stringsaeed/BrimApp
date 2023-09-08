import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  login: undefined;
  verify: { verificationId: string };
  Dashboard: undefined;
  Note: { id: string };
  Archive: undefined;
  Trash: undefined;
  Profile: undefined;
  AccountInfo: undefined;
  Preferences: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
