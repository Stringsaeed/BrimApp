import { createClient } from "@supabase/supabase-js";

import { config } from "@/config";
import { AsyncStorage } from "@/services/storage";
import type { Database } from "@/types";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

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
