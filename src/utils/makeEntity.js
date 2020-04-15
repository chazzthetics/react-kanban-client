import { nanoid } from "./nanoid";
import { slugify } from "./slugify";

export const makeBoard = (title, background) => {
  return {
    uuid: nanoid(),
    title,
    background,
    slug: slugify(title),
    description: null,
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
    tasks: []
  };
};

export const makeTask = (title, position) => {
  return {
    uuid: nanoid(),
    title,
    description: null,
    comment: null,
    attatchment: null,
    due_date: null,
    is_locked: false,
    is_editing: false,
    position
    // FIXME:
    // created_at: new Date().toDateString,
    // updated_at: new Date().toDateString
  };
};
