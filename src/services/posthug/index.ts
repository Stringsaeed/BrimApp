// posthog.ts
import _PostHog from "posthog-react-native";

export const PostHog = {
  async init() {
    if (process.env.EXPO_PUBLIC_POST_HUG_API_KEY) {
      return await _PostHog.initAsync(
        process.env.EXPO_PUBLIC_POST_HUG_API_KEY,
        {
          host: process.env.EXPO_PUBLIC_POST_HUG_HOST,
        }
      );
    }
  },
};
