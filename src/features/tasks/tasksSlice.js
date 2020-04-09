import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { hydrate } from "../boards/boardsSlice";
import axios from "axios";

const tasksAdapter = createEntityAdapter({
  selectId: state => state.uuid
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    taskCreated(state, action) {
      const { task } = action.payload;
      tasksAdapter.addOne(state, task);
    },
    taskRemoved(state, action) {
      const { taskId } = action.payload;
      tasksAdapter.removeOne(state, taskId);
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
    console.error(ex.response.data);
  }
};

export const removeTask = ({ taskId, columnId }) => async dispatch => {
  try {
    dispatch(taskRemoved({ taskId, columnId }));
    await axios.delete(`http://react-kanban.local/api/tasks/${taskId}`);
  } catch (ex) {
    console.error(ex.response.data);
  }
};
