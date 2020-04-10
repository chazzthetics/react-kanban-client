import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { hydrate } from "../boards/boardsSlice";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";

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
    columnCreated(state, action) {
      const { column, status = "success", error = null } = action.payload;
      columnsAdapter.addOne(state, column);
      state.status = status;
      state.error = error;
    },
    columnRemoved(state, action) {
      const { columnId, status = "success", error = null } = action.payload;
      columnsAdapter.removeOne(state, columnId);
      state.status = status;
      state.error = error;
    },
    columnTitleUpdated(state, action) {
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
    "boards/columnReordered": (state, action) => {
      const { newOrder } = action.payload;
      columnsAdapter.updateMany(
        state,
        newOrder.map((id, index) => (state.entities[id].position = index))
      );
    },
    "tasks/taskCreated": (state, action) => {
      const { columnId, task } = action.payload;
      state.entities[columnId].tasks.push(task.uuid);
    },
    "tasks/taskRemoved": (state, action) => {
      const { taskId, columnId } = action.payload;
      const tasks = state.entities[columnId].tasks;
      const removeIndex = tasks.indexOf(taskId);
      if (removeIndex >= 0) {
        tasks.splice(removeIndex, 1);
      }
    }
  }
});

export const {
  columnCreated,
  columnRemoved,
  columnTitleUpdated
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
    dispatch(columnCreated({ column, boardId }));
    await axios.post(
      `http://react-kanban.local/api/boards/${boardId}/columns`,
      column
    );
  } catch (ex) {
    dispatch(
      handleError(ex, columnRemoved, { columnId: column.uuid, boardId })
    );
  }
};

export const removeColumn = ({ columnId, boardId }) => async (
  dispatch,
  getState
) => {
  const column = getPreviousValue(getState(), "columns", columnId);

  try {
    dispatch(columnRemoved({ columnId, boardId }));
    await axios.delete(`http://react-kanban.local/api/columns/${columnId}`);
  } catch (ex) {
    dispatch(handleError(ex, columnCreated, { column, boardId }));
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
      dispatch(columnTitleUpdated({ columnId, newTitle: oldTitle }));
    } else {
      dispatch(columnTitleUpdated({ columnId, newTitle }));
      await axios.patch(`http://react-kanban.local/api/columns/${columnId}`, {
        title: newTitle
      });
    }
  } catch (ex) {
    dispatch(
      handleError(ex, columnTitleUpdated, { columnId, newTitle: oldTitle })
    );
  }
};
