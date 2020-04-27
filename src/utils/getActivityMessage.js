//TODO: FIXME: looks disgusting
export const getActivityMessage = activity => {
  const { description, recordable_type, changes } = activity;

  switch (description) {
    case "created":
      if (getEntityType(recordable_type) === "task") {
        return `added ${changes.after.task_title} to ${changes.after.column_title}`;
      } else if (getEntityType(recordable_type) === "list") {
        return `added ${changes.after.title} to this board`;
      }
      return `created this board`;
    case "title_updated":
      return `renamed ${
        recordable_type === "App\\Board"
          ? "this board"
          : recordable_type === "App\\Column"
          ? "list"
          : "card"
      } to ${changes.after.title} (from ${changes.before.title})`;
    case "background_updated":
      return `changed the background of this board`;
    case "removed":
      if (getEntityType(recordable_type) === "task") {
        return `removed ${changes.after.title} from ${changes.after.title}`;
      }

      return `removed ${getEntityType(recordable_type)} ${changes.after.title}`;
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

export const getTaskActivityMessage = activity => {
  const { description, changes } = activity;
  switch (description) {
    case "created":
      return `added ${changes.after.task_title} to this card`;
    case "title_updated":
      return `renamed this card to ${changes.after.title} (from ${changes.before.title})`;
    case "moved":
      return `moved this card from ${changes.before.column_title} to ${changes.after.column_title}`;
    default:
      throw new Error(`Unknown event ${description}`);
  }
};

function getEntityType(entity) {
  if (entity === "App\\Column") {
    return "list";
  }

  return entity.split("\\")[1].toLowerCase();
}
