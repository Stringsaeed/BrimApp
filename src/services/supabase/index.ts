import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

import { config } from "config";
import { AsyncStorage } from "services/storage";
import type { Database } from "types";

const supabaseClient = createClient<Database>(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: {
      detectSessionInUrl: false,
      autoRefreshToken: true,
      storage: AsyncStorage,
      persistSession: true,
    },
  }
);

export default supabaseClient;
