import { useNavigation } from "@react-navigation/native";

export default function useNavigateProfile() {
  const router = useNavigation();
  const onPressProfile = () => {
    router.navigate("Profile");
  };

  return onPressProfile;
}
