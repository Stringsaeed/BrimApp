import { useEffect, useMemo } from "react";
import {
  Appearance,
  ColorSchemeName,
  Platform,
  StatusBar,
  useColorScheme,
} from "react-native";
import { useMMKVString } from "react-native-mmkv";

import { storage } from "@/services";
import { UserThemeValue } from "@/types";

type ResolvedTheme = Exclude<UserThemeValue, "system">;

const normalizeSystemTheme = (systemTheme: ColorSchemeName): ResolvedTheme => {
  return systemTheme === "dark" ? "dark" : "light";
};

const getTheme = (value: string, systemTheme: ResolvedTheme): ResolvedTheme => {
  return value === "system" ? systemTheme : value === "dark" ? "dark" : "light";
};

function syncNativeTheme(themeName: UserThemeValue) {
  if (themeName === "system") {
    Appearance.setColorScheme("unspecified");
    return;
  }
  Appearance.setColorScheme(themeName);
}

export default function useUserTheme() {
  const system = normalizeSystemTheme(useColorScheme());
  const [userTheme = system, setUserTheme] = useMMKVString(
    "user.theme",
    storage
  );

  const theme: ResolvedTheme = getTheme(userTheme, system);
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
