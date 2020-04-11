import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { hydrate } from "../auth/authSlice";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";
import { tasksService } from "../../api/tasksService";

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
    await tasksService.create(task, columnId);
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
  } catch (ex) {
    dispatch(handleError(ex, created, { task, columnId }));
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
