import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import activitiesReducer from "../../features/activities/activitiesSlice";
import boardsReducer from "../../features/boards/boardsSlice";
import columnsReducer from "../../features/columns/columnsSlice";
import tasksReducer from "../../features/tasks/tasksSlice";

export default combineReducers({
  auth: authReducer,
  activities: activitiesReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer
});
