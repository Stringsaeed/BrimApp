import { vexo } from "vexo-analytics";

const apiKey = process.env.EXPO_PUBLIC_VEXO_ANALYTICS_API_KEY;

if (!apiKey) {
  throw new Error("Missing Vexo Analytics API key");
}
if (!__DEV__) {
  vexo(apiKey);
}

export default vexo;
