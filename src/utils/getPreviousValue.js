export const getPreviousValue = (state, entity, entityId = null) =>
  entityId ? state[entity].entities[entityId] : state[entity];
