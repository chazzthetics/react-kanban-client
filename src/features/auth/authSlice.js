import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchInitialData } from "../../api";
import { fetchActivities } from "../activities/activitiesSlice";
import { getInitials } from "../../utils/getInitials";

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials = { email: "jdoe@test.com", password: "password" },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        "http://react-kanban.local/api/auth/login",
        credentials
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

export const hydrate = createAsyncThunk(
  "hydrate",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchInitialData();
      dispatch(fetchActivities());
      return data;
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: null,
    isAuthenticated: false,
    user: null,
    status: "idle"
  },
  reducers: {},
  extraReducers: {
    [login.pending]: state => {
      if (state.status === "idle") {
        state.status = "pending";
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { access_token, user } = action.payload;
        state.isAuthenticated = true;
        state.access_token = access_token;
        state.user = {
          ...user,
          initials: getInitials(user.name)
        };
        state.status = "success";
      }
    }
  }
});

export default authSlice.reducer;
