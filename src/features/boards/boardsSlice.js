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
    current: null
  }),
  reducers: {
    boardCreated(state, action) {
      const { board } = action.payload;
      boardsAdapter.addOne(state, board);
      state.current = board.uuid;
    }
  },
  extraReducers: {
    [hydrate.fulfilled]: (state, action) => {
      const boards = action.payload.map(board => ({
        ...board,
        is_editing: false,
        columns: board.columns.map(column => column.uuid)
      }));
      boardsAdapter.setAll(state, boards);
      state.current =
        state.ids.find(id => state.entities[id].is_current) || null;
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
export const { boardCreated } = boardsSlice.actions;
export default boardsSlice.reducer;

export const createBoard = board => async dispatch => {
  try {
    dispatch(boardCreated({ board }));
    await axios.post("http://react-kanban.local/api/boards", board);
  } catch (ex) {
    console.error(ex.response.data);
  }
};
