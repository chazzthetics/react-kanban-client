import axios from "axios";

export const tasksService = {
  create: (task, columnId) => {
    return axios.post(`/columns/${columnId}/tasks`, task);
  },
  remove: taskId => {
    return axios.delete(`/tasks/${taskId}`);
  },
  reorder: (columnId, data) => {
    return axios.patch(`/columns/${columnId}/tasks/reorder`, data);
  },
  reorderBetween: (startColumnId, endColumnId, data) => {
    return axios.patch(
      `/columns/${startColumnId}/${endColumnId}/tasks/between`,
      data
    );
  }
};