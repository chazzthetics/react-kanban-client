export const getInitials = name => {
  const split = name.split(" ");
  const first = split[0][0];
  const last = split[1][0];

  return `${first} ${last}`;
};
