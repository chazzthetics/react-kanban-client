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

//TODO: Delete
// export const fetchColumns = createAsyncThunk(
//   "columns",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get("http://react-kanban.local/api/columns");
//       return data;
//     } catch (ex) {
//       rejectWithValue(ex.response.data);
//     }
//   }
// );

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
    }
  }
});

export const columnsSelectors = columnsAdapter.getSelectors(
  state => state.columns
);

export default columnsSlice.reducer;
