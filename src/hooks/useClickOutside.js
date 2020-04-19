import { useEffect, useRef, useCallback } from "react";

export const useClickOutside = callback => {
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
    document.addEventListener("mousedown", handleClickEvent, true);
    document.addEventListener("keydown", handleEscEvent, true);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent, true);
      document.removeEventListener("keydown", handleEscEvent, true);
    };
  }, [handleClickEvent, handleEscEvent]);

  return container;
};

export default useClickOutside;
