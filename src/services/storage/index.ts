import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const AsyncStorage = {
  setItem: async (key: string, value: string) => storage.set(key, value),
  getItem: async (key: string) => storage.getString(key) ?? null,
};
