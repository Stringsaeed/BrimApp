import { getLocales } from "expo-localization";
import { useMemo } from "react";

export default function useGetInitialLocale() {
  return useMemo(() => {
    const locals = getLocales();
    if (!locals.length) return "US";
    const lastLocal = locals[locals.length - 1];
    const { regionCode } = lastLocal;
    if (!regionCode) return "US";
    return regionCode;
  }, []);
}
