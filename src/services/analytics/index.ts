import "services/vexo";
import { identifyDevice } from "vexo-analytics";

import { AuthUser } from "types";

export const Analytics = {
  identify(user: AuthUser) {
    identifyDevice(user.uid);
  },
};
