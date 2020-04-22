import axios from "axios";

export const labelsService = {
  get: () => {
    return axios.get("/labels");
  }
};
