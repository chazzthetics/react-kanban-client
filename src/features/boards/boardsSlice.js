import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import axios from "axios";
import { slugify } from "../../utils/slugify";
import { getPreviousValue } from "../../utils/getPreviousValue";
import { handleError } from "../../utils/handleError";

const boardsAdapter = createEntityAdapter({
  selectId: board => board.uuid
});

export const hydrate = createAsyncThunk(
  "hydrate",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://react-kanban.local/api/boards");
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState({
    status: "idle",
    current: "",
    error: null
  }),
  reducers: {
    boardChanged(state, action) {
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
    boardCreated(state, action) {
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
    boardRemoved(state, action) {
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
    boardTitleUpdated(state, action) {
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
    boardStarToggled(state, action) {
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
    "columns/columnCreated": (state, action) => {
      const { boardId, column } = action.payload;
      state.entities[boardId].columns.push(column.uuid);
    },
    "columns/columnRemoved": (state, action) => {
      const { columnId, boardId } = action.payload;
      const columns = state.entities[boardId].columns;
      const removeIndex = columns.indexOf(columnId);
      if (removeIndex >= 0) {
        columns.splice(removeIndex, 1);
      }
    }
  }
});

export const {
  boardChanged,
  boardCreated,
  boardRemoved,
  boardTitleUpdated,
  boardStarToggled
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
    dispatch(boardChanged({ boardId }));

    await axios.patch(`http://react-kanban.local/api/boards/${boardId}`, null, {
      params: { current: true }
    });
  } catch (ex) {
    dispatch(handleError(ex, boardChanged, { boardId: previousBoard }));
  }
};

export const createBoard = board => async dispatch => {
  try {
    dispatch(boardCreated({ board }));
    await axios.post("http://react-kanban.local/api/boards", board);
  } catch (ex) {
    dispatch(handleError(ex, boardRemoved, { boardId: board.uuid }));
  }
};

export const removeBoard = boardId => async (dispatch, getState) => {
  const board = getPreviousValue(getState(), "boards", boardId);
  const hasBoard = getPreviousValue(getState(), "boards").ids.length > 0;

  try {
    if (hasBoard) {
      dispatch(boardRemoved({ boardId }));
      await axios.delete(`http://react-kanban.local/api/boards/${boardId}`);
    }
  } catch (ex) {
    dispatch(handleError(ex, boardCreated, { board }));
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
      dispatch(boardTitleUpdated({ boardId, newTitle: oldTitle }));
    } else {
      dispatch(boardTitleUpdated({ boardId, newTitle }));
      await axios.patch(`http://react-kanban.local/api/boards/${boardId}`, {
        title: newTitle
      });
    }
  } catch (ex) {
    dispatch(
      handleError(ex, boardTitleUpdated, { boardId, newTitle: oldTitle })
    );
  }
};

export const toggleBoardStar = boardId => async (dispatch, getState) => {
  const { is_starred } = getPreviousValue(getState(), "boards", boardId);

  try {
    dispatch(boardStarToggled({ boardId, is_starred }));
    await axios.patch(`http://react-kanban.local/api/boards/${boardId}`, {
      is_starred
    });
  } catch (ex) {
    dispatch(
      handleError(ex, boardStarToggled, { boardId, is_starred: !is_starred })
    );
  }
};
