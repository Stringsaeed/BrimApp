import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { DataSnapshot, Query, onValue, off, get } from "firebase/database";
import { useCallback } from "react";

import useSubscription from "./use-subscription";

type NextOrObserver = (data: DataSnapshot | null) => Promise<void>;

export function useDatabaseSnapshot<R = DataSnapshot>(
  queryKey: QueryKey,
  ref: Query,
  options: { subscribe?: boolean } = {},
  useQueryOptions?: Omit<UseQueryOptions<DataSnapshot, Error, R>, "queryFn">
): UseQueryResult<R, Error> {
  const isSubscription = !!options.subscribe;

  const subscribeFn = useCallback(
    (callback: NextOrObserver) => {
      onValue(ref, (snapshot) => {
        return callback(snapshot);
      });
      return () => {
        off(ref);
      };
    },
    [ref]
  );

  return useSubscription<DataSnapshot, Error, R>(
    queryKey,
    ["useDatabaseSnapshot", queryKey],
    subscribeFn,
    {
      ...useQueryOptions,
      fetchFn: async () => await get(ref),
      onlyOnce: !isSubscription,
    }
  );
}

function parseDataSnapshot(snapshot: DataSnapshot, toArray: boolean): any {
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
  ref: Query,
  options: UseDatabaseValueOptions = {},
  useQueryOptions?: Omit<UseQueryOptions<T, Error, R>, "queryFn">
): UseQueryResult<R, Error> {
  const isSubscription = !!options?.subscribe;

  const subscribeFn = useCallback(
    (callback: (data: T) => Promise<void>) => {
      onValue(ref, (snapshot) => {
        const data = parseDataSnapshot(snapshot, !!options?.toArray);
        return callback(data);
      });
      return () => {
        off(ref);
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
        parseDataSnapshot(await get(ref), !!options?.toArray),
      onlyOnce: !isSubscription,
    }
  );
}
