import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { hydrate } from "../auth/authSlice";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";
import { tasksService } from "../../api/tasksService";
import { fetchMostRecentActivity } from "../activities/activitiesSlice";
import { isDueDateEqual } from "../../utils/isDueDateEqual";

const tasksAdapter = createEntityAdapter({
  selectId: state => state.uuid
});

export const fetchTaskActivities = createAsyncThunk(
  "tasks/activities",
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await tasksService.getActivities(taskId);
      return { taskId, activities: data };
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({
    status: "idle",
    error: null,
    dragDisabled: false
  }),
  reducers: {
    created(state, action) {
      const { task, status = "success", error = null } = action.payload;
      tasksAdapter.addOne(state, task);
      state.status = status;
      state.error = error;
    },
    removed(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.removeOne(state, taskId);
      state.status = status;
      state.error = error;
      state.dragDisabled = false;
    },
    titleUpdated(state, action) {
      const {
        taskId,
        newTitle,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { title: newTitle }
      });
      state.status = status;
      state.error = error;
    },
    descriptionUpdated(state, action) {
      const {
        taskId,
        description,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { description }
      });
      state.status = status;
      state.error = error;
    },
    completedToggled(state, action) {
      const {
        taskId,
        completed,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { completed: !completed }
      });
      state.status = status;
      state.error = error;
    },
    labelToggled(state, action) {
      const {
        taskId,
        labelId,
        status = "success",
        error = null
      } = action.payload;
      const taskLabels = state.entities[taskId].labels;
      if (taskLabels.includes(labelId)) {
        taskLabels.splice(taskLabels.indexOf(labelId), 1);
      } else {
        taskLabels.push(labelId);
      }
      state.status = status;
      state.error = error;
    },
    labelsCleared(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { labels: [] }
      });
      state.status = status;
      state.error = error;
    },
    priorityToggled(state, action) {
      const {
        taskId,
        priorityId,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          priority: priorityId
        }
      });
      state.status = status;
      state.error = error;
    },
    priorityRemoved(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          priority: null
        }
      });
      state.status = status;
      state.error = error;
    },
    dueDateAdded(state, action) {
      const {
        taskId,
        due_date,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          due_date
        }
      });
      state.status = status;
      state.error = error;
      state.dragDisabled = false;
    },
    dueDateRemoved(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          due_date: null
        }
      });
      state.status = status;
      state.error = error;
      state.dragDisabled = false;
    },
    checklistAdded(state, action) {
      const {
        taskId,
        checklist,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          checklist: { ...checklist, items: [] }
        }
      });
      state.status = status;
      state.error = error;
    },
    checklistRemoved(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: {
          checklist: null
        }
      });
      state.status = status;
      state.error = error;
    },
    itemAddedToChecklist(state, action) {
      const { taskId, item, status = "success", error = null } = action.payload;
      state.entities[taskId].checklist.items.push(item);
      state.status = status;
      state.error = error;
    },
    itemRemovedFromChecklist(state, action) {
      const {
        taskId,
        itemId,
        status = "success",
        error = null
      } = action.payload;
      const items = state.entities[taskId].checklist.items;
      const itemIndex = items.findIndex(item => item.uuid === itemId);
      items.splice(itemIndex, 1);
      state.status = status;
      state.error = error;
    },
    checklistItemToggled(state, action) {
      const {
        taskId,
        itemId,
        status = "success",
        error = null
      } = action.payload;
      const item = state.entities[taskId].checklist.items.find(
        item => item.uuid === itemId
      );
      if (item) {
        item.completed = !item.completed;
      }
      state.status = status;
      state.error = error;
    },
    reordered(state, action) {
      const { newOrder, status = "success", error = null } = action.payload;
      tasksAdapter.updateMany(
        state,
        newOrder.map((id, index) => (state.entities[id].position = index))
      );
      state.status = status;
      state.error = error;
    },
    reorderedBetween(state, action) {
      const {
        startOrder,
        endOrder,
        status = "success",
        error = null
      } = action.payload;
      tasksAdapter.updateMany(
        state,
        startOrder.map((id, index) => (state.entities[id].position = index))
      );
      tasksAdapter.updateMany(
        state,
        endOrder.map((id, index) => (state.entities[id].position = index))
      );
      state.status = status;
      state.error = error;
    },
    quickEditOpened(state, action) {
      const { taskId } = action.payload;
      state.dragDisabled = true;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { isQuickOpen: true }
      });
    },
    quickEditClosed(state, action) {
      const { taskId } = action.payload;
      state.dragDisabled = false;
      tasksAdapter.updateOne(state, {
        id: taskId,
        changes: { isQuickOpen: false }
      });
    },
    copied(state, action) {
      const { task, status = "success", error = null } = action.payload;
      tasksAdapter.addOne(state, task);

      const tasksToUpdate = state.ids
        .filter(id => id !== task.uuid)
        .filter(id => state.entities[id].position >= task.position);

      tasksAdapter.updateMany(
        state,
        tasksToUpdate.map(
          id => (state.entities[id].position = state.entities[id].position + 1)
        )
      );
      state.status = status;
      state.error = error;
      state.dragDisabled = false;
    }
  },
  extraReducers: {
    [hydrate.fulfilled]: (state, action) => {
      const tasks = action.payload.flatMap(board =>
        board.columns
          .flatMap(column => column.tasks)
          .map(task => ({
            ...task,
            labels: task.labels.map(label => label.id),
            priority: task.priority[0] ? task.priority[0].id : null,
            checklist: task.checklist
              ? {
                  ...task.checklist,
                  items: task.checklist ? task.checklist.items : []
                }
              : null,
            activities: []
          }))
      );

      tasksAdapter.setAll(state, tasks);
      state.status = "success";
    },
    [fetchTaskActivities.pending]: state => {
      if (state.status === "success") {
        state.status = "pending";
      }
    },
    [fetchTaskActivities.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { taskId, activities } = action.payload;
        tasksAdapter.updateOne(state, {
          id: taskId,
          changes: { activities }
        });
        state.status = "success";
      }
    },
    [fetchMostRecentActivity.fulfilled]: (state, action) => {
      const { recordable_type, description, changes } = action.payload;
      if (recordable_type === "App\\Task" && description !== "removed") {
        const activities = [
          action.payload,
          ...state.entities[changes.uuid].activities.slice(0, 5)
        ];
        tasksAdapter.updateOne(state, {
          id: changes.uuid,
          changes: {
            activities
          }
        });
      }
    },
    "boards/removed": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.removeMany(state, tasks);
    },
    "boards/cleared": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.removeMany(state, tasks);
    },
    "boards/restored": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.upsertMany(state, tasks);
    },
    "columns/removed": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.removeMany(state, tasks);
    },
    "columns/cleared": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.removeMany(state, tasks);
    },
    "columns/restored": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.upsertMany(state, tasks);
    },
    "columns/copied": (state, action) => {
      const { tasks } = action.payload;
      tasksAdapter.upsertMany(state, tasks);
    }
  }
});

export const tasksSelectors = tasksAdapter.getSelectors(state => state.tasks);

export const {
  created,
  removed,
  titleUpdated,
  descriptionUpdated,
  completedToggled,
  labelToggled,
  labelsCleared,
  priorityToggled,
  priorityRemoved,
  dueDateAdded,
  dueDateRemoved,
  checklistAdded,
  checklistRemoved,
  itemAddedToChecklist,
  itemRemovedFromChecklist,
  checklistItemToggled,
  reordered,
  reorderedBetween,
  sortedBy,
  quickEditOpened,
  quickEditClosed,
  copied
} = tasksSlice.actions;
export default tasksSlice.reducer;

export const createTask = ({ task, columnId }) => async dispatch => {
  try {
    dispatch(created({ task, columnId }));
    await tasksService.create(task, columnId);
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(handleError(ex, removed, { taskId: task.uuid, columnId }));
  }
};

export const removeTask = ({ taskId, columnId }) => async (
  dispatch,
  getState
) => {
  const task = getPreviousValue(getState(), "tasks", taskId);

  try {
    dispatch(removed({ taskId, columnId }));
    await tasksService.remove(taskId);
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(handleError(ex, created, { task, columnId }));
  }
};

export const updateTaskTitle = ({ taskId, newTitle }) => async (
  dispatch,
  getState
) => {
  const { title: oldTitle } = getPreviousValue(getState(), "tasks", taskId);

  try {
    if (newTitle === oldTitle) return;

    if (newTitle === "") {
      // Restore original title
      dispatch(titleUpdated({ taskId, newTitle: oldTitle }));
    } else {
      dispatch(titleUpdated({ taskId, newTitle }));
      await tasksService.update(taskId, { title: newTitle });
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, titleUpdated, { taskId, newTitle: oldTitle }));
  }
};

export const updateTaskDescription = ({ taskId, description }) => async (
  dispatch,
  getState
) => {
  const { description: oldDescription } = getPreviousValue(
    getState(),
    "tasks",
    taskId
  );

  try {
    if (description === oldDescription) return;

    dispatch(descriptionUpdated({ taskId, description }));
    await tasksService.update(taskId, { description });
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(
      handleError(ex, descriptionUpdated, {
        taskId,
        description: oldDescription
      })
    );
  }
};

export const toggleCompleted = ({ taskId, completed }) => async dispatch => {
  try {
    dispatch(completedToggled({ taskId, completed }));
    await tasksService.update(taskId, { completed });
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(
      handleError(ex, completedToggled, { taskId, completed: !completed })
    );
  }
};

export const toggleLabel = ({ taskId, labelId }) => async (
  dispatch,
  getState
) => {
  const { labels } = getPreviousValue(getState(), "tasks", taskId);
  try {
    dispatch(labelToggled({ taskId, labelId }));
    if (labels.includes(labelId)) {
      await tasksService.removeLabel(taskId, labelId);
    } else {
      await tasksService.addLabel(taskId, labelId);
    }
  } catch (ex) {
    dispatch(handleError(ex, labelToggled, { taskId, labelId }));
  }
};

export const clearLabels = ({ taskId }) => async dispatch => {
  try {
    dispatch(labelsCleared({ taskId }));
    await tasksService.clearLabels(taskId);
  } catch (ex) {}
};

export const togglePriority = ({ taskId, priorityId }) => async (
  dispatch,
  getState
) => {
  const { priority: oldPriority } = getPreviousValue(
    getState(),
    "tasks",
    taskId
  );
  try {
    if (priorityId !== oldPriority) {
      dispatch(priorityToggled({ taskId, priorityId }));
      await tasksService.addPriority(taskId, priorityId);
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, priorityRemoved, { taskId }));
  }
};

export const removePriority = ({ taskId }) => async (dispatch, getState) => {
  const { priority } = getPreviousValue(getState(), "tasks", taskId);

  try {
    if (priority) {
      dispatch(priorityRemoved({ taskId }));
      await tasksService.removePriority(taskId);
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, priorityToggled, { taskId, priority }));
  }
};

export const addDueDate = ({ taskId, due_date }) => async (
  dispatch,
  getState
) => {
  const { due_date: old } = getPreviousValue(getState(), "tasks", taskId);

  try {
    if (!isDueDateEqual(old, due_date)) {
      dispatch(dueDateAdded({ taskId, due_date: due_date.toLocaleString() }));
      await tasksService.addDueDate(taskId, due_date);
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, dueDateRemoved, { taskId }));
  }
};

export const removeDueDate = ({ taskId }) => async (dispatch, getState) => {
  const { due_date } = getPreviousValue(getState(), "tasks", taskId);
  try {
    if (due_date) {
      dispatch(dueDateRemoved({ taskId }));
      await tasksService.removeDueDate(taskId);
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, dueDateAdded, { taskId, due_date }));
  }
};

export const addChecklist = ({ taskId, checklist }) => async dispatch => {
  try {
    dispatch(checklistAdded({ taskId, checklist }));
    await tasksService.addChecklist(taskId, checklist);
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(handleError(ex, checklistRemoved, { taskId }));
  }
};

export const removeChecklist = ({ taskId }) => async (dispatch, getState) => {
  const { checklist } = getPreviousValue(getState(), "tasks", taskId);
  try {
    if (checklist) {
      dispatch(checklistRemoved({ taskId }));
      await tasksService.removeChecklist(taskId);
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, checklistAdded, { taskId, checklist }));
  }
};

export const addItemToChecklist = ({ taskId, item }) => async dispatch => {
  try {
    dispatch(itemAddedToChecklist({ taskId, item }));
    await tasksService.addChecklistItem(taskId, item);
  } catch (ex) {
    dispatch(
      handleError(ex, itemRemovedFromChecklist, { taskId, itemId: item.uuid })
    );
  }
};

export const removeItemFromChecklist = ({ taskId, itemId }) => async (
  dispatch,
  getState
) => {
  const { checklist } = getPreviousValue(getState(), "tasks", taskId);
  const item = checklist.items.find(item => item.uuid === itemId);

  try {
    dispatch(itemRemovedFromChecklist({ taskId, itemId }));
    await tasksService.removeChecklistItem(itemId);
  } catch (ex) {
    dispatch(handleError(ex, itemAddedToChecklist, { taskId, item }));
  }
};

export const toggleChecklistItem = ({ taskId, itemId }) => async dispatch => {
  try {
    dispatch(checklistItemToggled({ taskId, itemId }));
    await tasksService.toggleChecklistItem(itemId);
  } catch (ex) {
    dispatch(handleError(ex, checklistItemToggled, { taskId, itemId }));
  }
};

export const reorderTask = ({ columnId, newOrder }) => async (
  dispatch,
  getState
) => {
  const { tasks: prevOrder } = getPreviousValue(
    getState(),
    "columns",
    columnId
  );

  try {
    if (JSON.stringify(prevOrder) === JSON.stringify(newOrder)) return;

    dispatch(reordered({ columnId, newOrder }));
    await tasksService.reorder(columnId, { newOrder });
  } catch (ex) {
    dispatch(handleError(ex, reordered, { columnId, newOrder: prevOrder }));
  }
};

export const reorderBetween = ({
  startColumnId,
  endColumnId,
  startOrder,
  endOrder
}) => async (dispatch, getState) => {
  const { tasks: prevStartOrder } = getPreviousValue(
    getState(),
    "columns",
    startColumnId
  );

  const { tasks: prevEndOrder } = getPreviousValue(
    getState(),
    "columns",
    endColumnId
  );

  try {
    dispatch(
      reorderedBetween({ startColumnId, endColumnId, startOrder, endOrder })
    );
    await tasksService.reorderBetween(startColumnId, endColumnId, {
      startOrder,
      endOrder
    });
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(
      handleError(ex, reorderedBetween, {
        startColumnId,
        endColumnId,
        startOrder: prevStartOrder,
        endOrder: prevEndOrder
      })
    );
  }
};

export const copyTask = ({ columnId, taskId, task }) => async dispatch => {
  try {
    dispatch(copied({ columnId, taskId, task }));
    await tasksService.copy(taskId, { columnId, task });
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    //TODO:
  }
};
