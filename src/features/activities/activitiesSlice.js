import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { activitiesService } from "../../api/activitiesService";

const activitiesAdapter = createEntityAdapter();

export const fetchActivities = createAsyncThunk(
  "activities/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await activitiesService.get();
      return data;
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: activitiesAdapter.getInitialState(),
  reducers: {
    removed(state, action) {
      activitiesAdapter.removeOne(state, action.payload);
    },
    cleared(state) {
      activitiesAdapter.removeMany(state, state.ids);
    }
  },
  extraReducers: {
    [fetchActivities.fulfilled]: (state, action) => {
      activitiesAdapter.setAll(state, action.payload);
    }
  }
});

export const activitiesSelectors = activitiesAdapter.getSelectors(
  state => state.activities
);

export const { removed, cleared } = activitiesSlice.actions;
export default activitiesSlice.reducer;

export const removeActivity = id => async dispatch => {
  try {
    dispatch(removed(id));
    await activitiesService.remove(id);
  } catch (ex) {
    //TODO:
  }
};

export const clearActivity = () => async (dispatch, getState) => {
  const activities = getState().activities.ids;

  try {
    dispatch(cleared());
    await activitiesService.clear(activities);
  } catch (ex) {
    //TODO:
  }
};
