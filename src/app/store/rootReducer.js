import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import activitiesReducer from "../../features/activities/activitiesSlice";
import photosReducer from "../../features/photos/photosSlice";
import boardsReducer from "../../features/boards/boardsSlice";
import columnsReducer from "../../features/columns/columnsSlice";
import tasksReducer from "../../features/tasks/tasksSlice";
import labelsReducer from "../../features/labels/labelsSlice";
import prioritiesReducer from "../../features/priorities/prioritiesSlice";

export default combineReducers({
  auth: authReducer,
  activities: activitiesReducer,
  photos: photosReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
  labels: labelsReducer,
  priorities: prioritiesReducer
});
