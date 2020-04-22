import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { labelsService } from "../../api/labelsService";

const labelsAdapter = createEntityAdapter();

export const fetchLabels = createAsyncThunk(
  "labels/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await labelsService.get();
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const labelsSlice = createSlice({
  name: "labels",
  initialState: labelsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchLabels.fulfilled]: (state, action) => {
      labelsAdapter.setAll(state, action.payload);
    }
  }
});

export const labelsSelectors = labelsAdapter.getSelectors(
  state => state.labels
);

export default labelsSlice.reducer;
