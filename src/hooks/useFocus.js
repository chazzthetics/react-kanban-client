import { useEffect, useRef } from "react";

export const useFocus = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    //TODO: cleanup?
  });

  return ref;
};
