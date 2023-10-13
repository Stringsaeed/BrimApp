import { useNavigation } from "@react-navigation/native";

import { Routes } from "routers";

export default function useNavigateProfile() {
  const router = useNavigation();
  const onPressProfile = () => {
    router.navigate(Routes.Profile);
  };

  return onPressProfile;
}
