import axios from "axios";

export const columnsService = {
  create: (column, boardId) => {
    return axios.post(`/boards/${boardId}/columns`, column);
  },
  remove: columnId => {
    return axios.delete(`/columns/${columnId}`);
  },
  update: (columnId, data) => {
    return axios.patch(
      `http://react-kanban.local/api/columns/${columnId}`,
      data
    );
  },
  reorder: (boardId, data) => {
    return axios.patch(
      `http://react-kanban.local/api/boards/${boardId}/columns/reorder`,
      data
    );
  }
};
