import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import boardsReducer from "../features/boards/boardsSlice";
import columnsReducer from "../features/columns/columnsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    columns: columnsReducer
  }
});
