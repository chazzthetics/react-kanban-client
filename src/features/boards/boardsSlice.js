import {
  createSlice,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";
import { slugify } from "../../utils/slugify";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";
import { boardsService } from "../../api/boardsService";
import { hydrate } from "../auth/authSlice";
import { fetchActivities } from "../activities/activitiesSlice";

const boardsAdapter = createEntityAdapter({
  selectId: board => board.uuid
});

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState({
    status: "idle",
    current: "",
    error: null
  }),
  reducers: {
    changed(state, action) {
      const { boardId, status = "success", error = null } = action.payload;
      state.error = error;
      state.status = status;
      state.current = boardId;
      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: { is_current: true }
      });
      boardsAdapter.updateMany(
        state,
        state.ids
          .filter(id => id !== boardId)
          .map(id => (state.entities[id].is_current = false))
      );
    },
    created(state, action) {
      const { board, status = "success", error = null } = action.payload;
      state.current = board.uuid || "";
      state.status = status;
      state.error = error;
      boardsAdapter.addOne(state, board);

      boardsAdapter.updateMany(
        state,
        state.ids
          .filter(id => id !== board.uuid)
          .map(id => (state.entities[id].is_current = false))
      );
    },
    removed(state, action) {
      const { boardId, status = "success", error = null } = action.payload;
      state.status = status;
      state.error = error;
      boardsAdapter.removeOne(state, boardId);
      boardsAdapter.updateOne(state, {
        id: state.current,
        changes: { is_current: true }
      });

      state.current = state.ids[state.ids.length - 1] || "";
    },
    cleared(state, action) {
      const { boardId, status = "success", error = null } = action.payload;
      state.status = status;
      state.error = error;
      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: { columns: [] }
      });
    },
    restored(state, action) {
      const { board, status = "success", error = null } = action.payload;
      state.status = status;
      state.error = error;
      boardsAdapter.upsertOne(state, board);
    },
    titleUpdated(state, action) {
      const {
        boardId,
        newTitle,
        status = "success",
        error = null
      } = action.payload;
      state.error = error;
      state.status = status;

      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: { title: newTitle, slug: slugify(newTitle) }
      });
    },
    starToggled(state, action) {
      const {
        boardId,
        is_starred,
        status = "success",
        error = null
      } = action.payload;
      state.error = error;
      state.status = status;
      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: { is_starred: !is_starred }
      });
    }
  },
  extraReducers: {
    [hydrate.pending]: state => {
      if (state.status === "idle" || state.status === "error") {
        state.status = "pending";
        state.error = null;
      }
    },
    [hydrate.fulfilled]: (state, action) => {
      if (state.status === "pending" && state.status !== "error") {
        const boards = action.payload.map(board => ({
          ...board,
          columns: board.columns.map(column => column.uuid)
        }));
        boardsAdapter.setAll(state, boards);
        state.current =
          state.ids.find(id => state.entities[id].is_current) ||
          state.ids[0] ||
          "";
        state.status = "success";
      }
    },
    [hydrate.rejected]: (state, action) => {
      // TODO:
    },
    "columns/created": (state, action) => {
      const { boardId, column } = action.payload;
      state.entities[boardId].columns.push(column.uuid);
    },
    "columns/removed": (state, action) => {
      const { columnId, boardId } = action.payload;
      const columns = state.entities[boardId].columns;
      const removeIndex = columns.indexOf(columnId);
      if (removeIndex >= 0) {
        columns.splice(removeIndex, 1);
      }
    },
    "columns/reordered": (state, action) => {
      const { boardId, newOrder } = action.payload;
      boardsAdapter.updateOne(state, {
        id: boardId,
        changes: { columns: newOrder }
      });
    }
  }
});

export const {
  changed,
  created,
  removed,
  cleared,
  restored,
  titleUpdated,
  starToggled
} = boardsSlice.actions;
export default boardsSlice.reducer;

// Selectors
export const boardsSelectors = boardsAdapter.getSelectors(
  state => state.boards
);

export const selectCurrentBoardId = createSelector(
  [state => state.boards.current],
  current => current
);

export const selectCurrentBoard = createSelector(
  [boardsSelectors.selectEntities, selectCurrentBoardId],
  (boards, current) => boards[current]
);

export const selectBoardColumnCount = createSelector(
  [boardsSelectors.selectEntities, state => state.boards.current],
  (boards, current) => (boards[current] ? boards[current].columns.length : [])
);

// Thunks
export const changeBoard = boardId => async (dispatch, getState) => {
  const { current: previousBoard } = getPreviousValue(getState(), "boards");

  try {
    dispatch(changed({ boardId }));
    await boardsService.update(boardId, { current: true });
  } catch (ex) {
    dispatch(handleError(ex, changed, { boardId: previousBoard }));
  }
};

export const createBoard = board => async dispatch => {
  try {
    dispatch(created({ board }));
    await boardsService.create(board);
    dispatch(fetchActivities());
  } catch (ex) {
    dispatch(handleError(ex, removed, { boardId: board.uuid }));
  }
};

export const removeBoard = boardId => async (dispatch, getState) => {
  const board = getPreviousValue(getState(), "boards", boardId);
  const hasBoard = getPreviousValue(getState(), "boards").ids.length > 0;

  try {
    if (hasBoard) {
      const tasks = board.columns.flatMap(
        column => getPreviousValue(getState(), "columns", column).tasks
      );

      dispatch(removed({ boardId, columns: board.columns, tasks }));
      await boardsService.remove(boardId);
      dispatch(fetchActivities());
    }
  } catch (ex) {
    dispatch(handleError(ex, created, { board }));
  }
};

export const clearBoard = boardId => async (dispatch, getState) => {
  const board = getPreviousValue(getState(), "boards", boardId);
  const columnTasks = board.columns.flatMap(
    column => getPreviousValue(getState(), "columns", column).tasks
  );
  const columns = board.columns.flatMap(column =>
    getPreviousValue(getState(), "columns", column)
  );
  const tasks = columnTasks.flatMap(task =>
    getPreviousValue(getState(), "tasks", task)
  );

  try {
    if (board.columns.length > 0) {
      dispatch(
        cleared({ boardId, columns: board.columns, tasks: columnTasks })
      );
      await boardsService.update(boardId, { clear: true });
    }
  } catch (ex) {
    dispatch(
      handleError(ex, restored, {
        board: { ...board, columns: board.columns },
        columns,
        tasks
      })
    );
  }
};

export const updateBoardTitle = ({ boardId, newTitle }) => async (
  dispatch,
  getState
) => {
  const { title: oldTitle } = getPreviousValue(getState(), "boards", boardId);

  try {
    if (newTitle === oldTitle) return;

    if (newTitle === "") {
      // Restore original title
      dispatch(titleUpdated({ boardId, newTitle: oldTitle }));
    } else {
      dispatch(titleUpdated({ boardId, newTitle }));
      await boardsService.update(boardId, { title: newTitle });
      dispatch(fetchActivities());
    }
  } catch (ex) {
    dispatch(handleError(ex, titleUpdated, { boardId, newTitle: oldTitle }));
  }
};

export const toggleBoardStar = boardId => async (dispatch, getState) => {
  const { is_starred } = getPreviousValue(getState(), "boards", boardId);

  try {
    dispatch(starToggled({ boardId, is_starred }));
    await boardsService.update(boardId, { is_starred });
    dispatch(fetchActivities());
  } catch (ex) {
    dispatch(
      handleError(ex, starToggled, { boardId, is_starred: !is_starred })
    );
  }
};
