import axios from "axios";

export const boardsService = {
  get: () => {},
  create: board => {
    return axios.post("/boards", board);
  },
  remove: boardId => {
    return axios.delete(`/boards/${boardId}`);
  },
  update: (boardId, data) => {
    return axios.patch(`/boards/${boardId}`, data);
  }
};
