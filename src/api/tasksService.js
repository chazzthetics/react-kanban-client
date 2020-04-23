import axios from "axios";

export const tasksService = {
  create: (task, columnId) => {
    return axios.post(`/columns/${columnId}/tasks`, task);
  },
  remove: taskId => {
    return axios.delete(`/tasks/${taskId}`);
  },
  update: (taskId, data) => {
    return axios.patch(`/tasks/${taskId}`, data);
  },
  reorder: (columnId, data) => {
    return axios.patch(`/columns/${columnId}/tasks/reorder`, data);
  },
  reorderBetween: (startColumnId, endColumnId, data) => {
    return axios.patch(
      `/columns/${startColumnId}/${endColumnId}/tasks/between`,
      data
    );
  },
  addLabel: (taskId, label) => {
    return axios.post(`/tasks/${taskId}/labels`, { label });
  },
  removeLabel: (taskId, label) => {
    return axios.put(`/tasks/${taskId}/labels`, { label });
  },
  addPriority: (taskId, priority) => {
    return axios.post(`/tasks/${taskId}/priority`, { priority });
  },
  removePriority: (taskId, priority) => {
    return axios.put(`/tasks/${taskId}/priority`, { priority });
  }
};
