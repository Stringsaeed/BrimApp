import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function useIsLocalAuthenticationEligible() {
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    void (async () => {
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (enrolledLevel > LocalAuthentication.SecurityLevel.NONE) {
        setIsEligible(true);
      }
    })();
  }, []);

  return isEligible;
}
