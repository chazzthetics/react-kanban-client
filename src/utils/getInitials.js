export const getInitials = name => {
  let split = name.split(" ");
  let first;
  let last;

  if (split.length >= 2) {
    first = split[0][0];
    last = split[1][0];
  } else {
    split = name.split("");
    first = split[0];
    last = split[1];
  }

  return `${first.toUpperCase()} ${last.toUpperCase()}`;
};
