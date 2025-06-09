import { useRouter } from "expo-router";

import { Routes } from "@/routers";

export default function useNavigateProfile() {
  const router = useRouter();
  const onPressProfile = () => {
    router.push(Routes.Profile);
  };

  return onPressProfile;
}
