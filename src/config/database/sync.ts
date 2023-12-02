import { synchronize } from "@nozbe/watermelondb/sync";

import database from "./database";

export default async function syncDatabase() {
  await synchronize({
    pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
      const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
        JSON.stringify(migration)
      )}`;
      const response = await fetch(`https://my.backend/sync?${urlParams}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { timestamp, changes } = await response.json();
      return { timestamp, changes };
    },
    pushChanges: async ({ lastPulledAt, changes }) => {
      const response = await fetch(
        `https://my.backend/sync?last_pulled_at=${lastPulledAt}`,
        {
          body: JSON.stringify(changes),
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
    },
    migrationsEnabledAtVersion: 1,
    database,
  });
}
