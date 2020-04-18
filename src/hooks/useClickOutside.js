import { useEffect, useRef, useCallback } from "react";

export const useClickOutside = callback => {
  const container = useRef(null);

  const handleEvent = useCallback(
    e => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target)) {
          callback();
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleEvent, true);

    return () => {
      document.removeEventListener("mousedown", handleEvent, true);
    };
  }, [handleEvent]);

  return container;
};

export default useClickOutside;
