import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const AsyncStorage = {
  setItem: (key: string, value: string) =>
    Promise.resolve(storage.set(key, value)),
  getItem: (key: string) => Promise.resolve(storage.getString(key) ?? null),
  removeItem: (key: string) => Promise.resolve(storage.delete(key)),
};
