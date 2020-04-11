import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { hydrate } from "../boards/boardsSlice";
import axios from "axios";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";

const tasksAdapter = createEntityAdapter({
  selectId: state => state.uuid
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({
    status: "idle",
    error: null
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
    }
  },
  extraReducers: {
    [hydrate.fulfilled]: (state, action) => {
      const tasks = action.payload.flatMap(board =>
        board.columns
          .flatMap(column => column.tasks)
          .map(task => ({
            ...task,
            is_editing: false
          }))
      );

      tasksAdapter.setAll(state, tasks);
      state.status = "success";
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
    }
  }
});

export const tasksSelectors = tasksAdapter.getSelectors(state => state.tasks);
export const {
  created,
  removed,
  reordered,
  reorderedBetween
} = tasksSlice.actions;
export default tasksSlice.reducer;

export const createTask = ({ task, columnId }) => async dispatch => {
  try {
    dispatch(created({ task, columnId }));
    await axios.post(
      `http://react-kanban.local/api/columns/${columnId}/tasks`,
      task
    );
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
    await axios.delete(`http://react-kanban.local/api/tasks/${taskId}`);
  } catch (ex) {
    dispatch(handleError(ex, created, { task, columnId }));
  }
};

export const reorderTask = ({ columnId, newOrder }) => async dispatch => {
  try {
    dispatch(reordered({ columnId, newOrder }));
    await axios.patch(
      `http://react-kanban.local/api/columns/${columnId}/tasks/reorder`,
      { newOrder }
    );
  } catch (ex) {}
};

export const reorderBetween = ({
  startColumnId,
  endColumnId,
  startOrder,
  endOrder
}) => async dispatch => {
  try {
    dispatch(
      reorderedBetween({ startColumnId, endColumnId, startOrder, endOrder })
    );
    await axios.patch(
      `http://react-kanban.local/api/columns/${startColumnId}/${endColumnId}/tasks/between`,
      { startOrder, endOrder }
    );
  } catch (ex) {}
};
