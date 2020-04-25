import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { prioritiesService } from "../../api/prioritiesService";

const prioritiesAdapter = createEntityAdapter();

export const fetchPriorities = createAsyncThunk(
  "priorities/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await prioritiesService.get();
      if (!localStorage.getItem("priorities")) {
        localStorage.setItem("priorities", JSON.stringify(data));
      }
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const prioritiesSlice = createSlice({
  name: "priorities",
  initialState: prioritiesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchPriorities.fulfilled]: (state, action) => {
      prioritiesAdapter.setAll(state, action.payload);
    }
  }
});

export const prioritiesSelectors = prioritiesAdapter.getSelectors(
  state => state.priorities
);

export default prioritiesSlice.reducer;
