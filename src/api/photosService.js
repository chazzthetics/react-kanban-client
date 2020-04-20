import axios from "axios";

export const photosService = {
  get: (query = "nature") => {
    return axios.get(`/photos?query=${query}`);
  }
};
