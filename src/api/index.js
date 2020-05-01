import axios from "axios";

axios.defaults.baseURL = "http://react-kanban.local/api";

export const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("access_token", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("access_token");
  }
};

export const checkToHydrate = () => {
  return axios.get("/boards?q=count");
};

export const fetchInitialData = () => {
  return axios.get("/boards");
};

export const fetchFromLocalStorage = data => {
  const resource = localStorage.getItem(data);

  if (!resource) {
    return axios.get(`/${data}`);
  }

  return {
    data: JSON.parse(resource)
  };
};
