import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { hydrate } from "../boards/boardsSlice";

const columnsAdapter = createEntityAdapter({
  selectId: column => column.uuid
});

const columnsSlice = createSlice({
  name: "columns",
  initialState: columnsAdapter.getInitialState(),
  reducers: {
    columnCreated(state, action) {
      const { column } = action.payload;
      columnsAdapter.addOne(state, column);
    },
    columnRemoved(state, action) {
      const { columnId } = action.payload;
      columnsAdapter.removeOne(state, columnId);
    },
    columnTitleUpdated(state, action) {
      const { columnId, newTitle } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { title: newTitle }
      });
    }
  },
  extraReducers: {
    [hydrate.fulfilled]: (state, action) => {
      const columns = action.payload.flatMap(board =>
        board.columns.map(column => ({
          ...column,
          tasks: column.tasks.map(task => task.uuid),
          is_editing: false
        }))
      );
      columnsAdapter.setAll(state, columns);
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
    console.error(ex.response.data);
  }
};

export const removeColumn = ({ columnId, boardId }) => async dispatch => {
  try {
    dispatch(columnRemoved({ columnId, boardId }));
    await axios.delete(`http://react-kanban.local/api/columns/${columnId}`);
  } catch (ex) {
    console.error(ex.response.data);
  }
};

export const updateColumnTitle = ({ columnId, newTitle }) => async (
  dispatch,
  getState
) => {
  const { title: oldTitle } = getPreviousValue(getState(), columnId);

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
    console.error(ex.response.data);
  }
};

function getPreviousValue(state, entityId, entity = "columns") {
  if (entityId) {
    return state[entity].entities[entityId];
  }

  return state[entity];
}
