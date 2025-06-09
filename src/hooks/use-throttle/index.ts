import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, ms = 200) {
  const [state, setState] = useState<T | undefined>(value);
  const timeout = useRef<number>(undefined);
  const nextValue = useRef<T>(undefined);
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
      if (typeof timeout.current === "number") {
        clearTimeout(timeout.current);
      }
    },
    []
  );

  return state;
}
