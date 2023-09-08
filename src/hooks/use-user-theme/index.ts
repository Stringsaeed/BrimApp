import { useColorScheme } from "react-native";
import { useMMKVBoolean, useMMKVString } from "react-native-mmkv";

import { storage } from "services";

export default function useUserTheme() {
  const system = useColorScheme() ?? "light";
  const [userTheme = system, setUserTheme] = useMMKVString(
    "user.theme",
    storage
  );
  const [userThemeAuto = true, setUserThemeAuto] = useMMKVBoolean(
    "user.syncTheme",
    storage
  );

  const theme = userThemeAuto ? system : userTheme;

  return {
    setUserThemeAuto,
    userThemeAuto,
    setUserTheme,
    userTheme,
    theme,
  };
}
