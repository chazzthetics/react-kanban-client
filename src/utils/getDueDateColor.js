import {
  toDate,
  add,
  addHours,
  isWithinInterval,
  isToday,
  isPast,
  isTomorrow
} from "date-fns";

export const getDueDateColor = date => {
  const today = toDate(new Date());
  const dueDate = toDate(addHours(new Date(date), 4));

  const nextWeek = add(today, { weeks: 1 });
  const isNextWeek = isWithinInterval(dueDate, {
    start: today,
    end: nextWeek
  });

  if (isPast(dueDate)) return "red";
  if (isToday(dueDate)) return "yellow";
  if (isTomorrow(dueDate)) return "orange";
  if (isNextWeek) return "blue";

  return "gray";
};

export const getDueDateMessage = date => {
  switch (getDueDateColor(date)) {
    case "red":
      return "Overdue";
    case "yellow":
      return "Today";
    case "orange":
      return "Tomorrow";
    default:
      return "";
  }
};
