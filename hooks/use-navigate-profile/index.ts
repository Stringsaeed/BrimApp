import { useRouter } from "expo-router";

export default function useNavigateProfile() {
  const router = useRouter();
  const onPressProfile = () => {
    router.push("/profile");
  };

  return onPressProfile;
}
