import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export interface IAsyncStorage {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
}

export const AsyncStorage: IAsyncStorage = {
  setItem: (key: string, value: string) =>
    Promise.resolve(storage.set(key, value)),
  getItem: (key: string) => Promise.resolve(storage.getString(key) ?? null),
  removeItem: (key: string) => Promise.resolve(storage.delete(key)),
};
