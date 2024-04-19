import { observable } from "@legendapp/state";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

import supabaseClient from "services/supabase";
import { Note } from "types";

configureObservablePersistence({ pluginLocal: ObservablePersistMMKV });

export const notesState = observable({
  notes: [] as Note[],
});

persistObservable(notesState, {
  pluginRemote: {
    get: ({ onChange }) => {
      const getFn = async () => {
        const session = await supabaseClient.auth.getSession();
        if (!session) {
          return { notes: [] };
        }

        const userId = session.data.session?.user.id;
        if (!userId) {
          return { notes: [] };
        }

        const result = await supabaseClient
          .from("notes")
          .select("*")
          .eq("user_id", userId);

        return { notes: result.data ?? [] };
      };

      // Set a timer to poll every 10 seconds
      setInterval(async () => {
        const data = await getFn();
        await onChange({ value: data });
      }, 10000);

      // Return the initial value
      return getFn();
    },
    set: async ({ value }) => {
      try {
        const result = await supabaseClient.from("notes").upsert(value.notes);
        if (result.error) {
          throw result.error;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving notes", error);
      }
    },
  },
  local: "notesState",
});

enableReactTracking({
  auto: true,
});
