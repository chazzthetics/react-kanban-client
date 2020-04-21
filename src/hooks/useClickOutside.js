import { useEffect, useRef, useCallback } from "react";

export const useClickOutside = (
  close,
  options = {
    submit: {
      click: false,
      esc: false,
      enter: false
    },
    close: {
      click: false,
      esc: false,
      enter: false
    }
  },
  submit = null
) => {
  const container = useRef(null);

  const handleClickEvent = useCallback(
    e => {
      if (container.current && e.target !== null) {
        if (!container.current.contains(e.target)) {
          if (options.submit && options.submit.click) {
            submit();
          }

          if (options.close && options.close.click) {
            close();
          }
        }
      }
    },
    [close, submit, options]
  );

  const handleEscEvent = useCallback(
    e => {
      if (e.keyCode === 27) {
        if (options.submit && options.submit.esc) {
          submit();
        }

        if (options.close && options.close.esc) {
          close();
        }
      }
    },
    [close, submit, options]
  );

  const handleEnterEvent = useCallback(
    e => {
      if (e.keyCode === 13) {
        if (options.submit && options.submit.enter) {
          submit();
        }

        if (options.close && options.close.enter) {
          close();
        }
      }
    },
    [close, submit, options]
  );

  useEffect(() => {
    if (
      (options.close && options.close.enter) ||
      (options.submit && options.submit.enter)
    ) {
      document.addEventListener("keydown", handleEnterEvent, true);
    }

    if (
      (options.close && options.close.esc) ||
      (options.submit && options.submit.esc)
    ) {
      document.addEventListener("keydown", handleEscEvent, true);
    }

    if (
      (options.close && options.close.click) ||
      (options.submit && options.submit.click)
    ) {
      document.addEventListener("mousedown", handleClickEvent, true);
    }

    return () => {
      document.removeEventListener("keydown", handleEscEvent, true);
      document.removeEventListener("keydown", handleEnterEvent, true);
      document.removeEventListener("mousedown", handleClickEvent, true);
    };
  }, [options, handleClickEvent, handleEscEvent, handleEnterEvent]);

  return container;
};

export default useClickOutside;
