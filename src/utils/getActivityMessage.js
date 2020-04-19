//TODO:
export const getActivityMessage = activity => {
  const { description, recordable_type, changes } = activity;

  switch (description) {
    case "registered":
      return "registered a new account";
    case "logged_in":
      return `logged in`;
    case "created":
      if (getEntityType(recordable_type) === "task") {
        return `added ${changes.after.task_title} to ${changes.after.column_title}`;
      } else if (getEntityType(recordable_type) === "list") {
        return `added ${changes.after.title} to this board`;
      }
      return `created this board`;
    case "title_updated":
      return `renamed ${
        recordable_type === "App\\Board" ? "this board" : "list"
      } to ${changes.after.title} (from ${changes.before.title})`;
    case "removed":
      if (getEntityType(recordable_type) === "task") {
        return `removed ${changes.before.title} from ${changes.before.title}`;
      }

      return `removed ${getEntityType(recordable_type)} ${
        changes.before.title
      }`;
    case "starred":
      return `starred board ${changes.after.title}`;
    case "unstarred":
      return `unstarred board ${changes.after.title}`;
    case "locked":
      return `locked list ${changes.after.title}`;
    case "unlocked":
      return `unlocked list ${changes.after.title}`;
    case "moved":
      return `moved ${changes.after.task_title} from ${changes.before.column_title} to ${changes.after.column_title}`;
    default:
      throw new Error(`Unknown event '${description}'`);
  }
};

function getEntityType(entity) {
  if (entity === "App\\Column") {
    return "list";
  }

  return entity.split("\\")[1].toLowerCase();
}
