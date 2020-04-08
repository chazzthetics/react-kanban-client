import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

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
    current: ""
  }),
  reducers: {
    boardChanged(state, action) {
      const { boardId } = action.payload;
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
      const { board } = action.payload;
      boardsAdapter.addOne(state, board);
      state.current = board.uuid;
    },
    boardRemoved(state, action) {
      const { boardId } = action.payload;
      boardsAdapter.removeOne(state, boardId);
      state.current = state.ids[state.ids.length - 1];
    }
  },
  extraReducers: {
    [hydrate.pending]: state => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [hydrate.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const boards = action.payload.map(board => ({
          ...board,
          is_editing: false,
          columns: board.columns.map(column => column.uuid)
        }));
        boardsAdapter.setAll(state, boards);
        state.current =
          state.ids.find(id => state.entities[id].is_current) || state.ids[0];
        state.status = "success";
      }
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

export const boardsSelectors = boardsAdapter.getSelectors(
  state => state.boards
);
export const { boardChanged, boardCreated, boardRemoved } = boardsSlice.actions;
export default boardsSlice.reducer;

export const changeBoard = boardId => async dispatch => {
  try {
    dispatch(boardChanged({ boardId }));
    console.log(boardId);
    await axios.patch(`http://react-kanban.local/api/boards/${boardId}`, null, {
      params: {
        current: true
      }
    });
  } catch (ex) {
    console.error(ex.response.data);
  }
};

export const createBoard = board => async dispatch => {
  try {
    dispatch(boardCreated({ board }));
    await axios.post("http://react-kanban.local/api/boards", board);
  } catch (ex) {
    console.error(ex);
  }
};

export const removeBoard = boardId => async dispatch => {
  try {
    dispatch(boardRemoved({ boardId }));
    await axios.delete(`http://react-kanban.local/api/boards/${boardId}`);
  } catch (ex) {
    console.error(ex.response.data);
  }
};
