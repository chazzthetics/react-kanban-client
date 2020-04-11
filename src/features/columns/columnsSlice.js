import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import { hydrate } from "../boards/boardsSlice";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";
import { columnsService } from "../../api/columnsService";

const columnsAdapter = createEntityAdapter({
  selectId: column => column.uuid
});

const columnsSlice = createSlice({
  name: "columns",
  initialState: columnsAdapter.getInitialState({
    status: "idle",
    error: null
  }),
  reducers: {
    created(state, action) {
      const { column, status = "success", error = null } = action.payload;
      columnsAdapter.addOne(state, column);
      state.status = status;
      state.error = error;
    },
    removed(state, action) {
      const { columnId, status = "success", error = null } = action.payload;
      columnsAdapter.removeOne(state, columnId);
      state.status = status;
      state.error = error;
    },
    restored(state, action) {
      const { column, status = "success", error = null } = action.payload;
      state.status = status;
      state.error = error;
      columnsAdapter.upsertOne(state, column);
    },
    cleared(state, action) {
      const { columnId, status = "success", error = null } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { tasks: [] }
      });
      state.status = status;
      state.error = error;
    },
    titleUpdated(state, action) {
      const {
        columnId,
        newTitle,
        status = "success",
        error = null
      } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { title: newTitle }
      });
      state.status = status;
      state.error = error;
    },
    reordered(state, action) {
      const { newOrder, status = "success", error = null } = action.payload;
      columnsAdapter.updateMany(
        state,
        newOrder.map((id, index) => (state.entities[id].position = index))
      );
      state.status = status;
      state.error = error;
    }
  },
  extraReducers: {
    [hydrate.fulfilled]: (state, action) => {
      const columns = action.payload.flatMap(board =>
        board.columns.map(column => ({
          ...column,
          tasks: column.tasks.map(task => task.uuid)
        }))
      );
      columnsAdapter.setAll(state, columns);
      state.status = "success";
    },
    "boards/removed": (state, action) => {
      const { columns } = action.payload;
      columnsAdapter.removeMany(state, columns);
    },
    "boards/cleared": (state, action) => {
      const { columns } = action.payload;
      columnsAdapter.removeMany(state, columns);
    },
    "boards/restored": (state, action) => {
      const { columns } = action.payload;
      columnsAdapter.upsertMany(state, columns);
    },
    "tasks/created": (state, action) => {
      const { columnId, task } = action.payload;
      state.entities[columnId].tasks.push(task.uuid);
    },
    "tasks/removed": (state, action) => {
      const { columnId, taskId } = action.payload;
      const tasks = state.entities[columnId].tasks;
      const removeIndex = tasks.indexOf(taskId);
      if (removeIndex >= 0) {
        tasks.splice(removeIndex, 1);
      }
    },
    "tasks/reordered": (state, action) => {
      const { columnId, newOrder } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { tasks: newOrder }
      });
    },
    "tasks/reorderedBetween": (state, action) => {
      console.log(action.payload);
      const {
        startColumnId,
        endColumnId,
        startOrder,
        endOrder
      } = action.payload;
      columnsAdapter.updateOne(state, {
        id: startColumnId,
        changes: { tasks: startOrder }
      });
      columnsAdapter.updateOne(state, {
        id: endColumnId,
        changes: { tasks: endOrder }
      });
    }
  }
});

export const {
  created,
  removed,
  restored,
  cleared,
  titleUpdated,
  reordered
} = columnsSlice.actions;
export default columnsSlice.reducer;

// Selectors
export const columnsSelectors = columnsAdapter.getSelectors(
  state => state.columns
);

export const makeSelectColumnTaskCount = () =>
  createSelector(
    [columnsSelectors.selectEntities, (_, columnId) => columnId],
    (columns, columnId) =>
      columns[columnId] ? columns[columnId].tasks.length : []
  );

// Thunks
export const createColumn = ({ column, boardId }) => async dispatch => {
  try {
    dispatch(created({ column, boardId }));
    await columnsService.create(column, boardId);
  } catch (ex) {
    dispatch(handleError(ex, removed, { columnId: column.uuid, boardId }));
  }
};

export const removeColumn = ({ columnId, boardId }) => async (
  dispatch,
  getState
) => {
  const column = getPreviousValue(getState(), "columns", columnId);

  try {
    dispatch(removed({ columnId, boardId, tasks: column.tasks }));
    await columnsService.remove(columnId);
  } catch (ex) {
    dispatch(handleError(ex, created, { column, boardId }));
  }
};

export const clearColumn = columnId => async (dispatch, getState) => {
  const column = getPreviousValue(getState(), "columns", columnId);
  const tasks = column.tasks.flatMap(task =>
    getPreviousValue(getState(), "tasks", task)
  );

  try {
    if (column.tasks.length > 0) {
      dispatch(cleared({ columnId, tasks: column.tasks }));
      await columnsService.update(columnId, { clear: true });
    }
  } catch (ex) {
    dispatch(
      handleError(ex, restored, {
        column: { ...column, tasks: column.tasks },
        tasks
      })
    );
  }
};

export const updateColumnTitle = ({ columnId, newTitle }) => async (
  dispatch,
  getState
) => {
  const { title: oldTitle } = getPreviousValue(getState(), "columns", columnId);

  try {
    if (newTitle === oldTitle) return;

    if (newTitle === "") {
      // Restore original title
      dispatch(titleUpdated({ columnId, newTitle: oldTitle }));
    } else {
      dispatch(titleUpdated({ columnId, newTitle }));
      await columnsService.update(columnId, { title: newTitle });
    }
  } catch (ex) {
    dispatch(handleError(ex, titleUpdated, { columnId, newTitle: oldTitle }));
  }
};

export const reorderColumn = ({ boardId, newOrder }) => async (
  dispatch,
  getState
) => {
  const { columns: prevOrder } = getPreviousValue(
    getState(),
    "boards",
    boardId
  );

  try {
    dispatch(reordered({ boardId, newOrder }));
    await columnsService.reorder(boardId, { newOrder });
  } catch (ex) {
    dispatch(handleError(ex, reordered, { boardId, newOrder: prevOrder }));
  }
};
