import { format, addHours } from "date-fns/";

export const formatDate = (date, formatStr = "MMM d") => {
  return format(addHours(new Date(date), 4), formatStr);
};
