import "services/vexo";
// import type TPostHog from "posthog-react-native";

// import { PostHog } from "services/posthug";
import { identifyDevice } from "vexo-analytics";

import { Vexo } from "services/vexo";
import { AuthUser } from "types";

class AnalyticsService {
  // postHug: TPostHog | undefined;

  constructor() {
    void this.init();
  }

  init() {
    Vexo.init();
    // this.postHug = await PostHog.init();
  }

  async identify(user: AuthUser) {
    await identifyDevice(user.uid);
    // this.postHug?.identify(user.uid, user);
  }

  async signOut() {
    // await this.postHug?.reset();
  }
}

export const Analytics = new AnalyticsService();
