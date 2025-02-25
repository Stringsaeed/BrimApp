import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export interface IAsyncStorage {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
  multiGet: (keys: string[]) => Promise<[string, string | undefined][]>;
}
export const AsyncStorage: IAsyncStorage = {
  setItem: (key: string, value: string) => {
    return Promise.resolve(storage.set(key, value));
  },
  multiGet: (keys: string[]) =>
    Promise.resolve(keys.map((key) => [key, storage.getString(key)])),
  getItem: (key: string) => Promise.resolve(storage.getString(key) ?? null),
  removeItem: (key: string) => Promise.resolve(storage.delete(key)),
};
