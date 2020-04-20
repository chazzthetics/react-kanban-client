import { useEffect, useRef, useCallback } from "react";

export const useClickOutside = (callback, onlyKey = false) => {
  const container = useRef(null);

  const handleClickEvent = useCallback(
    e => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target)) {
          callback();
        }
      }
    },
    [callback]
  );

  const handleEscEvent = useCallback(
    e => {
      if (e.keyCode === 27) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    if (!onlyKey) {
      document.addEventListener("mousedown", handleClickEvent, true);
    }

    document.addEventListener("keydown", handleEscEvent, true);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent, true);
      document.removeEventListener("keydown", handleEscEvent, true);
    };
  }, [onlyKey, handleClickEvent, handleEscEvent]);

  return container;
};

export default useClickOutside;
