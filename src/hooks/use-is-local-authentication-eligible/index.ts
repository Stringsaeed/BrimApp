import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function useIsLocalAuthenticationEligible() {
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    (async () => {
      const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (enrolledLevel > 1) {
        setIsEligible(true);
      }
    })();
  }, []);

  return isEligible;
}
