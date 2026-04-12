import { useMMKVString } from "react-native-mmkv";
import { storage } from "@/services/storage";
import { UserAccentValue } from "@/types/theme";

export default function useUserAccent() {
  const [userAccent = "pink10", setUserAccent] = useMMKVString(
    "user.accent",
    storage
  );

  const onChange = (value: UserAccentValue) => {
    setUserAccent(value);
  };

  return {
    accent: userAccent as UserAccentValue,
    onChange,
  };
}
