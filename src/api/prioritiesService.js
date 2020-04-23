import axios from "axios";

export const prioritiesService = {
  get: () => {
    return axios.get("/priorities");
  }
};
