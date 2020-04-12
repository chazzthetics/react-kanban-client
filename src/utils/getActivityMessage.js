export const getActivityMessage = activity => {
  const { description, recordable_type, changes } = activity;
  switch (description) {
    case "created":
      return `created a new ${getEntityType(recordable_type)}`;
    case "title_updated":
      return `renamed ${
        recordable_type === "App\\Board" ? "this board" : "list"
      } to ${changes.after.title} ${
        recordable_type === "App\\Column"
          ? `(from ${changes.before.title})`
          : ""
      }`;
    case "removed":
      return `removed ${getEntityType(recordable_type)} ${
        changes.before.title
      }`;
    default:
      throw new Error(`Unknown ${recordable_type}`);
  }
};

function getEntityType(entity) {
  if (entity === "App\\Column") {
    return "LIST";
  }

  return entity.split("\\")[1].toUpperCase();
}
