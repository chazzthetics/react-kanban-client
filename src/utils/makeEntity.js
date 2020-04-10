import { nanoid } from "./nanoid";

export const makeColumn = (title, position) => {
  return {
    uuid: nanoid(),
    title,
    position,
    is_locked: false,
    is_editing: false,
    tasks: []
  };
};

export const makeTask = (content, position) => {
  return {
    uuid: nanoid(),
    content,
    is_locked: false,
    is_editing: false,
    position
  };
};
