import { observable } from "@legendapp/state";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { configureSynced } from "@legendapp/state/sync";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import { v4 as uuidv4 } from "uuid";

import { AsyncStorage } from "services/storage";
import supabaseClient from "services/supabase";
import type { Note } from "types";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
export const generateId = () => uuidv4();

// Create a configured sync function
const customSynced = configureSynced(syncedSupabase, {
  // Use React Native Async Storage
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage: AsyncStorage,
    }),
  },
  fieldCreatedAt: "created_at",
  fieldUpdatedAt: "updated_at",
  // Optionally enable soft deletes
  fieldDeleted: "deleted_at",
  changesSince: "last-sync",
  supabase: supabaseClient,
  generateId,
});

export const notes$ = observable<Record<string, Note> | undefined>(
  customSynced({
    select: (from) =>
      from.select(
        "created_at,deleted_at,id,is_private,note,status,title,updated_at,user_id"
      ),
    persist: {
      retrySync: true, // Persist pending changes and retry
      name: "notes",
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
    actions: ["read", "create", "update", "delete"],
    supabase: supabaseClient,
    collection: "notes",
    realtime: true,
  })
);
