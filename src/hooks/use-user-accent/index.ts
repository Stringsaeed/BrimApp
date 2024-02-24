import { useMMKVString } from "react-native-mmkv";

import { storage } from "services";
import { UserAccentValue } from "types";

/**
 * @internal
 */
export default function useUserAccent() {
  const [userAccent = "pink10", setUserAccent] = useMMKVString(
    "user.accent",
    storage
  );

  const onChange = (value: string) => {
    setUserAccent(value);
  };

  return {
    accent: userAccent,
    onChange,
  } as {
    accent: UserAccentValue;
    onChange: (value: UserAccentValue) => void;
  };
}
