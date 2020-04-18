import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { activitiesService } from "../../api/activitiesService";

const activitiesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id
});

export const fetchActivities = createAsyncThunk(
  "activities/get",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await activitiesService.get(page);

      return data;
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

export const fetchMostRecentActivity = createAsyncThunk(
  "activities/recent",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await activitiesService.getMostRecent();
      return data;
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: activitiesAdapter.getInitialState({
    status: "idle",
    current: 0,
    next: 0,
    last: 0
  }),
  reducers: {
    removed(state, action) {
      activitiesAdapter.removeOne(state, action.payload);
    },
    cleared(state) {
      activitiesAdapter.removeMany(state, state.ids);
      state.current = 0;
      state.next = 0;
      state.last = 0;
    }
  },
  extraReducers: {
    [fetchActivities.pending]: state => {},
    [fetchActivities.fulfilled]: (state, action) => {
      const { data, current_page, last_page } = action.payload;

      state.last = last_page;
      state.current = current_page;

      if (last_page !== 1) {
        state.next = state.current + 1;
      }

      if (data.length === 1) {
        activitiesAdapter.setAll(state, data || {});
      } else {
        activitiesAdapter.addMany(state, data);
      }
    },
    [fetchMostRecentActivity.pending]: state => {},
    [fetchMostRecentActivity.fulfilled]: (state, action) => {
      activitiesAdapter.addOne(state, action.payload);
    },
    "boards/removed": state => {
      activitiesAdapter.removeMany(state, state.ids);
      state.current = 0;
      state.next = 0;
      state.last = 0;
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
