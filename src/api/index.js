import axios from "axios";

axios.defaults.baseURL = "http://react-kanban.local/api";

export const fetchInitialData = () => {
  return axios.get("/boards");
};
