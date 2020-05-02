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
    is_open: false,
    tasks: []
  };
};

export const makeTask = (title, position) => {
  return {
    uuid: nanoid(),
    title,
    description: null,
    priority: null,
    comment: null,
    completed: false,
    attatchment: null,
    due_date: null,
    checklist: null,
    labels: [],
    position,
    activities: [],
    created_at: Date.now()
  };
};

export const makeChecklist = title => {
  return {
    uuid: nanoid(),
    title,
    items: []
  };
};

export const makeChecklistItem = title => {
  return {
    uuid: nanoid(),
    title,
    completed: false
  };
};
