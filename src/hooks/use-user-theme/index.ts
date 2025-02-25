import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect, useMemo } from "react";
import {
  ColorSchemeName,
  useColorScheme,
  Appearance,
  StatusBar,
  Platform,
} from "react-native";
import { useMMKVString } from "react-native-mmkv";

import { storage } from "services";
import { UserThemeValue } from "types";

const getTheme = (value: string, systemTheme: NonNullable<ColorSchemeName>) => {
  return value === "system" ? systemTheme : value === "dark" ? "dark" : "light";
};

function syncNativeTheme(themeName: UserThemeValue) {
  if (themeName === "system") {
    Appearance.setColorScheme(null);
    return;
  }

  Appearance.setColorScheme(themeName);
}

export default function useUserTheme() {
  const system = useColorScheme() ?? "light";
  const [userTheme = system, setUserTheme] = useMMKVString(
    "user.theme",
    storage
  );

  const theme: Exclude<UserThemeValue, "system"> = getTheme(userTheme, system);
  const themeName = useMemo<UserThemeValue>(() => {
    if (userTheme === "dark") {
      return "dark";
    }

    if (userTheme === "light") {
      return "light";
    }

    return "system";
  }, [userTheme]);

  const onChange = (value: UserThemeValue) => {
    setUserTheme(value);
  };

  useEffect(() => {
    StatusBar.setBarStyle(theme === "dark" ? "light-content" : "dark-content");
  }, [theme]);

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("transparent");
    }
  }, []);

  useEffect(() => {
    syncNativeTheme(themeName);
  }, [themeName]);

  return {
    themeName,
    onChange,
    theme,
  };
}
