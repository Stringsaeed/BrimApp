import "services/vexo";
// import type TPostHog from "posthog-react-native";
import { identifyDevice } from "vexo-analytics";

// import { PostHog } from "services/posthug";
import { Vexo } from "services/vexo";
import { AuthUser } from "types";

class AnalyticsService {
  // postHug: TPostHog | undefined;

  constructor() {
    this.init();
  }

  async init() {
    Vexo.init();
    // this.postHug = await PostHog.init();
  }

  identify(user: AuthUser) {
    identifyDevice(user.uid);
    // this.postHug?.identify(user.uid, user);
  }

  async signOut() {
    // await this.postHug?.reset();
  }
}

export const Analytics = new AnalyticsService();
