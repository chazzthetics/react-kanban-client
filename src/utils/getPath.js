export const dashboard = ({ username }) => {
  return `/${username}/boards`;
};

export const board = board => {
  return `/b/${board.uuid}/${board.slug}`;
};
