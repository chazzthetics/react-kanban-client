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
  "boards",
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
    }
  }
});

export const boardsSelectors = boardsAdapter.getSelectors(
  state => state.boards
);
export default boardsSlice.reducer;
