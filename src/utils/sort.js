export const getSortedListOrder = (list, sortFn) => {
  return list.sort(sortFn).map(item => item.uuid);
};

export const name = (a, b) => {
  const first = a.title.toLowerCase();
  const second = b.title.toLowerCase();

  if (first < second) return -1;
  else if (first > second) return 1;
  else return 0;
};

export const newest = (a, b) => {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

export const oldest = (a, b) => {
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
};

export const highestPriority = (a, b) => {
  if (a.priority === b.priority) return 0;
  else if (a.priority === null) return 1;
  else if (b.priority === null) return -1;
  else return b.priority - a.priority;
};

export const lowestPriority = (a, b) => {
  if (a.priority === b.priority) return 0;
  else if (a.priority === null) return 1;
  else if (b.priority === null) return -1;
  else return a.priority - b.priority;
};

export const dueDate = (a, b) => {
  if (a.due_date === b.due_date) return 0;
  else if (a.due_date === null) return 1;
  else if (b.due_date === null) return -1;
  else return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
};
