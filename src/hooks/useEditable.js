import { useState, useEffect, useCallback } from "react";

export const useEditable = (entity, prop) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (entity) {
      setValue(entity[prop]);
    } else {
      setValue("");
    }
  }, [entity, prop]);

  return [value, handleChange];
};
