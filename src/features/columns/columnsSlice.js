import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
import { fetchBoards } from "../boards/boardsSlice";

const columnsAdapter = createEntityAdapter({
  selectId: column => column.uuid
});

export const createColumn = createAsyncThunk(
  "columns/create",
  async ({ column, uuid }, { rejectWithValue }) => {
    try {
      await axios.post(
        `http://react-kanban.local/api/boards/${uuid}/columns`,
        column
      );

      return { column, uuid };
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const columnsSlice = createSlice({
  name: "columns",
  initialState: columnsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchBoards.fulfilled]: (state, action) => {
      const columns = action.payload.flatMap(board =>
        board.columns.map(column => ({ ...column, is_editing: false }))
      );
      columnsAdapter.setAll(state, columns);
    },
    [createColumn.fulfilled]: (state, action) => {
      const { column } = action.payload;
      columnsAdapter.addOne(state, column);
    }
  }
});

export const columnsSelectors = columnsAdapter.getSelectors(
  state => state.columns
);

export default columnsSlice.reducer;
