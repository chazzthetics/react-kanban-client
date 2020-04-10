import { nanoid } from "./nanoid";
import { slugify } from "./slugify";

export const makeBoard = (title, color) => {
  return {
    uuid: nanoid(),
    title,
    color,
    slug: slugify(title),
    is_current: true,
    is_starred: false,
    columns: []
  };
};

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
    // FIXME:
    // created_at: new Date().toDateString,
    // updated_at: new Date().toDateString
  };
};
