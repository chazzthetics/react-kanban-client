import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import { photosService } from "../../api/photosService";

const photosAdapter = createEntityAdapter();

export const fetchPhotos = createAsyncThunk(
  "photos/get",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await photosService.get(query);

      return data;
    } catch (ex) {
      rejectWithValue(ex);
    }
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState: photosAdapter.getInitialState({
    status: "idle",
    error: null
  }),
  reducers: {
    creditHovered(state, action) {
      const { photoId } = action.payload;
      photosAdapter.updateOne(state, {
        id: photoId,
        changes: { isShown: !state.entities[photoId].isShown }
      });
    }
  },
  extraReducers: {
    [fetchPhotos.pending]: (state, action) => {
      if (
        state.status === "idle" ||
        state.status === "success" ||
        state.status === "error"
      ) {
        state.status = "pending";
      }
    },
    [fetchPhotos.fulfilled]: (state, action) => {
      const photos = action.payload.photos.map(photo => ({
        ...photo,
        showCredit: false
      }));
      if (state.status === "pending") {
        photosAdapter.setAll(state, photos);
        state.error = null;
        state.status = "success";
      }
    },
    [fetchPhotos.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    }
  }
});

export const { creditHovered } = photosSlice.actions;

export const photosSelectors = photosAdapter.getSelectors(
  state => state.photos
);

export default photosSlice.reducer;
