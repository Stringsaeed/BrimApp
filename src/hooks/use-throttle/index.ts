import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, ms = 200) {
  const [state, setState] = useState<T | undefined>(value);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const nextValue = useRef<T | undefined>(undefined);
  const hasNextValue = useRef(false);

  useEffect(() => {
    if (!timeout.current) {
      setState(value);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
  }, [value, ms]);

  // clear on unmount
  useEffect(
    () => () => {
      if (timeout.current !== undefined) {
        clearTimeout(timeout.current);
      }
    },
    []
  );

  return state;
}
