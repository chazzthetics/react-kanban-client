import axios from "axios";

axios.defaults.baseURL = "http://react-kanban.local/api";

export const checkToHydrate = () => {
  return axios.get("/boards?q=count");
};

export const fetchInitialData = () => {
  return axios.get("/boards");
};

export const fetchFromLocalStorage = data => {
  if (!localStorage.getItem(data)) {
    return axios.get(`/${data}`);
  }

  return { data: JSON.parse(localStorage.getItem(data)) };
};
