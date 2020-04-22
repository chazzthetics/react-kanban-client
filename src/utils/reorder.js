export const reorder = (originalOrder, source, destination) => {
  const newOrder = [...originalOrder];
  const [removed] = newOrder.splice(source, 1);
  newOrder.splice(destination, 0, removed);

  return newOrder;
};
