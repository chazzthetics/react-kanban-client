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
  copy: (taskId, data) => {
    return axios.post(`/tasks/${taskId}/copy`, data);
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
  clearLabels: taskId => {
    return axios.delete(`/tasks/${taskId}/labels`);
  },
  addPriority: (taskId, priority) => {
    return axios.post(`/tasks/${taskId}/priority`, { priority });
  },
  removePriority: taskId => {
    return axios.put(`/tasks/${taskId}/priority`);
  },
  addDueDate: (taskId, due_date) => {
    return axios.put(`/tasks/${taskId}/due_date`, { due_date });
  },
  removeDueDate: taskId => {
    return axios.delete(`/tasks/${taskId}/due_date`);
  },
  getActivities: taskId => {
    return axios.get(`/tasks/${taskId}/activities`);
  },
  addChecklist: (taskId, checklist) => {
    return axios.post(`/tasks/${taskId}/checklist`, checklist);
  },
  removeChecklist: taskId => {
    return axios.delete(`/tasks/${taskId}/checklist`);
  },
  addChecklistItem: (taskId, item) => {
    return axios.post(`/tasks/${taskId}/checklist/items`, item);
  },
  removeChecklistItem: itemId => {
    return axios.delete(`/checklist/${itemId}`);
  },
  toggleChecklistItem: itemId => {
    return axios.patch(`/checklist/${itemId}`);
  }
};
