import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const activitiesAdapter = createEntityAdapter();

export const fetchActivities = createAsyncThunk(
  "activities/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/activities");
      return data;
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: activitiesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchActivities.fulfilled]: (state, action) => {
      activitiesAdapter.setAll(state, action.payload);
    }
  }
});

export const activitiesSelectors = activitiesAdapter.getSelectors(
  state => state.activities
);

export default activitiesSlice.reducer;
