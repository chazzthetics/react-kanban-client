import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import { hydrate } from "../auth/authSlice";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";
import { columnsService } from "../../api/columnsService";
import {
  fetchMostRecentActivity,
  fetchActivities
} from "../activities/activitiesSlice";

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
    actionsToggled(state, action) {
      const { columnId, isOpen } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { is_open: isOpen }
      });
    },
    lockToggled(state, action) {
      const {
        columnId,
        is_locked,
        status = "success",
        error = null
      } = action.payload;
      columnsAdapter.updateOne(state, {
        id: columnId,
        changes: { is_locked: !is_locked }
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
    },
    moved(state, action) {
      const {
        startOrder,
        endOrder,
        status = "success",
        error = null
      } = action.payload;
      columnsAdapter.updateMany(
        state,
        startOrder.map((id, index) => (state.entities[id].position = index))
      );
      columnsAdapter.updateMany(
        state,
        endOrder.map((id, index) => (state.entities[id].position = index))
      );
      state.status = status;
      state.error = error;
    },
    copied(state, action) {
      const {
        columnId,
        column,
        status = "success",
        error = null
      } = action.payload;
      columnsAdapter.addOne(state, column);

      //TODO: refactor
      const columnsToUpdate = state.ids
        .filter(id => id !== columnId)
        .filter(id => id !== column.uuid)
        .filter(id => state.entities[id].position >= column.position);

      columnsAdapter.updateMany(
        state,
        columnsToUpdate.map(
          id => (state.entities[id].position = state.entities[id].position + 1)
        )
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
          is_open: false,
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
    },
    "tasks/copied": (state, action) => {
      const { columnId, task } = action.payload;
      const tasks = state.entities[columnId].tasks;
      tasks.splice(task.position, 0, task.uuid);
    }
  }
});

export const {
  created,
  removed,
  restored,
  cleared,
  titleUpdated,
  lockToggled,
  actionsToggled,
  reordered,
  moved,
  copied
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
    dispatch(fetchMostRecentActivity());
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
    dispatch(fetchMostRecentActivity());
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
      dispatch(fetchMostRecentActivity());
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
      dispatch(fetchMostRecentActivity());
    }
  } catch (ex) {
    dispatch(handleError(ex, titleUpdated, { columnId, newTitle: oldTitle }));
  }
};

export const toggleLockColumn = columnId => async (dispatch, getState) => {
  const { is_locked } = getPreviousValue(getState(), "columns", columnId);
  try {
    dispatch(lockToggled({ columnId, is_locked }));
    await columnsService.update(columnId, { is_locked });
    dispatch(fetchMostRecentActivity());
  } catch (ex) {
    dispatch(handleError(ex, lockToggled, { columnId, is_locked: !is_locked }));
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

export const moveColumn = ({
  startBoardId,
  endBoardId,
  startOrder,
  endOrder
}) => async (dispatch, getState) => {
  const { columns: prevStartColumns } = getPreviousValue(
    getState(),
    "boards",
    startBoardId
  );
  const { columns: prevEndColumns } = getPreviousValue(
    getState(),
    "boards",
    endBoardId
  );

  try {
    dispatch(moved({ startBoardId, endBoardId, startOrder, endOrder }));
    await columnsService.move(startBoardId, {
      endBoardId,
      startOrder,
      endOrder
    });
  } catch (ex) {
    dispatch(
      handleError(ex, moved, {
        startBoardId,
        endBoardId,
        startOrder: prevStartColumns,
        endOrder: prevEndColumns
      })
    );
  }
};

export const copyColumn = ({
  boardId,
  columnId,
  column,
  tasks
}) => async dispatch => {
  try {
    dispatch(copied({ boardId, columnId, column, tasks }));
    await columnsService.copy(columnId, { column, tasks });
    dispatch(fetchActivities());
  } catch (ex) {
    //TODO:
  }
};
