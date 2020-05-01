import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../api/authService";
import { fetchInitialData, checkToHydrate } from "../../api";
import { fetchLabels } from "../labels/labelsSlice";
import { fetchPriorities } from "../priorities/prioritiesSlice";
import { fetchActivities } from "../activities/activitiesSlice";
import { getInitials } from "../../utils/getInitials";

export const login = createAsyncThunk("auth/login", async credentials => {
  return await authService.login(credentials);
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async token => {
    return await authService.authenticate(token);
  }
);

export const register = createAsyncThunk("auth/register", async credentials => {
  return await authService.register(credentials);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const hydrate = createAsyncThunk(
  "hydrate",
  async (from, { dispatch, rejectWithValue }) => {
    try {
      const { data: count } = await checkToHydrate();
      const { payload: priorities } = await dispatch(fetchPriorities());
      const { payload: labels } = await dispatch(fetchLabels());

      if (count > 0 && priorities && labels) {
        const { data } = await fetchInitialData();

        if (from !== "boards") {
          await dispatch(fetchActivities());
        }

        return data;
      }

      return [];
    } catch (ex) {
      rejectWithValue(ex.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: localStorage.getItem("access_token") || null,
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: {
    [hydrate.pending]: state => {
      if (state.status === "authenticated") {
        state.status = "pending";
      }
    },
    [hydrate.fulfilled]: state => {
      if (state.status !== "authenticated" && state.status === "pending") {
        state.status = "hydrated";
      }
    },
    [login.pending]: state => {
      if (state.status === "idle") {
        state.status = "pending";
        state.error = null;
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
        state.status = "authenticated";
        state.error = null;
      }
    },
    [login.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.access_token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error;
      }
    },
    [authenticate.pending]: state => {
      if (state.status === "idle") {
        state.status = "pending";
        state.error = null;
      }
    },
    [authenticate.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { user } = action.payload;
        state.isAuthenticated = true;
        state.user = {
          ...user,
          initials: getInitials(user.name)
        };
        state.status = "authenticated";
        state.error = null;
      }
    },
    [authenticate.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.access_token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error;
      }
    },
    [register.pending]: state => {
      if (state.status === "idle") {
        state.status = "pending";
        state.error = null;
      }
    },
    [register.fulfilled]: (state, action) => {
      if (state.status === "pending") {
        const { access_token, user } = action.payload;
        state.isAuthenticated = true;
        state.access_token = access_token;
        state.user = {
          ...user,
          initials: getInitials(user.name)
        };
        state.status = "authenticated";
        state.error = null;
      }
    },
    [register.rejected]: (state, action) => {
      if (state.status === "pending") {
        state.status = "idle";
        state.access_token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error;
      }
    },
    [logout.fulfilled]: state => {
      state.status = "idle";
      state.access_token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  }
});

export default authSlice.reducer;
