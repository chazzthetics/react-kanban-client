export const isDueDateEqual = (old, current) => {
  const oldDate = new Date(old);
  const currentDate = new Date(current);

  if (
    oldDate.getDay() === currentDate.getDay() &&
    oldDate.getMonth() === currentDate.getMonth() &&
    oldDate.getFullYear() === currentDate.getFullYear()
  ) {
    return true;
  }
};
