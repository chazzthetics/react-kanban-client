import { formatDate } from "./formatDate";

const BOARD = "App\\Board";
const COLUMN = "App\\Column";
const TASK = "App\\Task";

export const getActivityMessage = (activity, fromTask = false) => {
  const { description, recordable_type, changes } = activity;
  switch (recordable_type) {
    case BOARD:
      switch (description) {
        case "created":
          return `created this board`;
        case "starred":
          return `starred this board`;
        case "unstarred":
          return `unstarred this board`;
        case "title_updated":
          return `renamed this board to ${changes.after.title} (from ${changes.before.title})`;
        case "background_updated":
          return `changed the background of this board`;
        case "description_updated":
          return `changed the description of this board`;
        case "cleared":
          return "cleared this board";
        default:
          throw new Error(`Unknown activity: ${description}`);
      }
    case COLUMN:
      switch (description) {
        case "created":
          return `added ${changes.title} to this board`;
        case "removed":
          return `removed list ${changes.title}`;
        case "cleared":
          return `cleared list ${changes.title}`;
        case "locked":
          return `locked list ${changes.title}`;
        case "unlocked":
          return `unlocked list ${changes.title}`;
        case "title_updated":
          return `renamed list to ${changes.after.title} (from ${changes.before.title})`;
        default:
          throw new Error(`Unknown activity: ${description}`);
      }
    case TASK:
      switch (description) {
        case "created":
          return `added ${showThisOrTitle(fromTask, changes.title)} to ${
            changes.parent_title
          }`;
        case "removed":
          return `removed ${changes.title} from ${changes.parent_title}`;
        case "title_updated":
          return fromTask
            ? `renamed this card to ${changes.after.title} from (${changes.before.title})`
            : `renamed card to ${changes.after.title} (from ${changes.before.title})`;
        case "description_updated":
          return `changed the description of ${showThisOrTitle(
            fromTask,
            changes.title
          )}`;
        case "completed":
          return `marked the due date on ${showThisOrTitle(
            fromTask,
            changes.title
          )} complete`;
        case "incompleted":
          return `marked the due date on ${showThisOrTitle(
            fromTask,
            changes.title
          )} incomplete`;
        case "checklist_added":
          return `added ${changes.checklist} to ${showThisOrTitle(
            fromTask,
            changes.title
          )}`;
        case "checklist_removed":
          return `removed the checklist from ${showThisOrTitle(
            fromTask,
            changes.title
          )}`;
        case "due_date_changed":
          return !changes.before.due_date
            ? `added a due date to ${showThisOrTitle(fromTask, changes.title)}`
            : !changes.after.due_date
            ? `removed the due date from ${showThisOrTitle(
                fromTask,
                changes.title
              )}`
            : `changed the due date of ${showThisOrTitle(
                fromTask,
                changes.title
              )} to ${formatDate(changes.after.due_date, "MMM do")}`;
        case "priority_changed":
          return !changes.priority
            ? `removed the priority from ${showThisOrTitle(
                fromTask,
                changes.title
              )}`
            : `changed the priority of ${showThisOrTitle(
                fromTask,
                changes.title
              )} to ${changes.priority}`;
        case "moved":
          return `moved ${showThisOrTitle(fromTask, changes.title)} from ${
            changes.before.title
          } to ${changes.after.title}`;
        default:
          throw new Error(`Unknown activity: ${description}`);
      }
    default:
      return;
  }
};

function showThisOrTitle(show, title) {
  return show ? "this card" : title;
}
