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
    taskCreated(state, action) {
      const { task, status = "success", error = null } = action.payload;
      tasksAdapter.addOne(state, task);
      state.status = status;
      state.error = error;
    },
    taskRemoved(state, action) {
      const { taskId, status = "success", error = null } = action.payload;
      tasksAdapter.removeOne(state, taskId);
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
    }
  }
});

export const tasksSelectors = tasksAdapter.getSelectors(state => state.tasks);
export const { taskCreated, taskRemoved } = tasksSlice.actions;
export default tasksSlice.reducer;

export const createTask = ({ task, columnId }) => async dispatch => {
  try {
    dispatch(taskCreated({ task, columnId }));
    await axios.post(
      `http://react-kanban.local/api/columns/${columnId}/tasks`,
      task
    );
  } catch (ex) {
    dispatch(handleError(ex, taskRemoved, { taskId: task.uuid, columnId }));
  }
};

export const removeTask = ({ taskId, columnId }) => async (
  dispatch,
  getState
) => {
  const task = getPreviousValue(getState(), "tasks", taskId);

  try {
    dispatch(taskRemoved({ taskId, columnId }));
    await axios.delete(`http://react-kanban.local/api/tasks/${taskId}`);
  } catch (ex) {
    dispatch(handleError(ex, taskCreated, { task, columnId }));
  }
};
