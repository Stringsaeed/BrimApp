import { useMMKVString } from "react-native-mmkv";

import { storage } from "services";

export default function useUserAccent() {
  const [userAccent = "pink", setUserAccent] = useMMKVString(
    "user.accent",
    storage
  );

  const onChange = (value: string) => {
    setUserAccent(value);
  };

  return {
    accent: userAccent,
    onChange,
  };
}
