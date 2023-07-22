import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useCallback } from "react";

import useSubscription from "./use-subscription";

type NextOrObserver = (
  data: FirebaseDatabaseTypes.DataSnapshot | null
) => Promise<void>;

export function useDatabaseSnapshot<R = FirebaseDatabaseTypes.DataSnapshot>(
  queryKey: QueryKey,
  ref: FirebaseDatabaseTypes.Query,
  options: { subscribe?: boolean } = {},
  useQueryOptions?: Omit<
    UseQueryOptions<FirebaseDatabaseTypes.DataSnapshot, Error, R>,
    "queryFn"
  >
): UseQueryResult<R, Error> {
  const isSubscription = !!options.subscribe;

  const subscribeFn = useCallback(
    (callback: NextOrObserver) => {
      ref.on("value", (snapshot) => {
        return callback(snapshot);
      });
      return () => {
        ref.off("value");
      };
    },
    [ref]
  );

  return useSubscription<FirebaseDatabaseTypes.DataSnapshot, Error, R>(
    queryKey,
    ["useDatabaseSnapshot", queryKey],
    subscribeFn,
    {
      ...useQueryOptions,
      fetchFn: async () => await ref.once("value"),
      onlyOnce: !isSubscription,
    }
  );
}

function parseDataSnapshot(
  snapshot: FirebaseDatabaseTypes.DataSnapshot,
  toArray: boolean
): any {
  if (!snapshot.exists()) {
    return null;
  }

  if (snapshot.hasChildren() && toArray) {
    const array: unknown[] = [];
    snapshot.forEach((snapshot) => {
      array.push(parseDataSnapshot(snapshot, toArray));
      return undefined;
    });
    return array;
  }

  return snapshot.val();
}

export type UseDatabaseValueOptions = {
  subscribe?: boolean;
  toArray?: boolean;
};

export function useDatabaseValue<T = unknown | null, R = T>(
  queryKey: QueryKey,
  ref: FirebaseDatabaseTypes.Query,
  options: UseDatabaseValueOptions = {},
  useQueryOptions?: Omit<UseQueryOptions<T, Error, R>, "queryFn">
): UseQueryResult<R, Error> {
  const isSubscription = !!options?.subscribe;

  const subscribeFn = useCallback(
    (callback: (data: T) => Promise<void>) => {
      ref.on("value", (snapshot) => {
        const data = parseDataSnapshot(snapshot, !!options?.toArray);
        return callback(data);
      });
      return () => {
        ref.off("value");
      };
    },
    [options?.toArray, ref]
  );

  return useSubscription<T, Error, R>(
    queryKey,
    ["useDatabaseValue", queryKey],
    subscribeFn,
    {
      ...useQueryOptions,
      fetchFn: async () =>
        parseDataSnapshot(await ref.once("value"), !!options?.toArray),
      onlyOnce: !isSubscription,
    }
  );
}
