import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const boardsAdapter = createEntityAdapter({
  selectId: board => board.uuid
});

export const fetchBoards = createAsyncThunk(
  "boards/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://react-kanban.local/api/boards");
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/create",
  async (board, { rejectWithValue }) => {
    try {
      await axios.post("http://react-kanban.local/api/boards", board);
      return { board };
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: boardsAdapter.getInitialState({
    status: "idle",
    current: null
  }),
  reducers: {},
  extraReducers: {
    [fetchBoards.fulfilled]: (state, action) => {
      const boards = action.payload.map(board => ({
        ...board,
        is_editing: false,
        columns: board.columns.map(column => column.uuid)
      }));
      boardsAdapter.setAll(state, boards);
      state.current = state.ids.find(id => state.entities[id].is_current);
    },
    [createBoard.fulfilled]: (state, action) => {
      boardsAdapter.addOne(state, action.payload.board);
      state.current = action.payload.board.uuid;
    },
    "columns/create/fulfilled": (state, action) => {
      state.entities[action.payload.uuid].columns.push(
        action.payload.column.uuid
      );
    }
  }
});

export const boardsSelectors = boardsAdapter.getSelectors(
  state => state.boards
);
export default boardsSlice.reducer;
