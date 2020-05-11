import axios from "axios";

export const columnsService = {
  create: (column, boardId) => {
    return axios.post(`/boards/${boardId}/columns`, column);
  },
  remove: columnId => {
    return axios.delete(`/columns/${columnId}`);
  },
  update: (columnId, data) => {
    return axios.patch(`/columns/${columnId}`, data);
  },
  reorder: (boardId, data) => {
    return axios.patch(`/boards/${boardId}/columns/reorder`, data);
  },
  move: (boardId, data) => {
    return axios.put(`/boards/${boardId}/columns/move`, data);
  },
  copy: (columnId, data) => {
    return axios.post(`/columns/${columnId}/copy`, data);
  }
};
