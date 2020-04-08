import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import boardsReducer from "../../features/boards/boardsSlice";
import columnsReducer from "../../features/columns/columnsSlice";
import tasksReducer from "../../features/tasks/tasksSlice";

export default combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer
});
