import axios from "axios";

export const activitiesService = {
  get: (page = 1) => {
    return axios.get(`/activities?page=${page}`);
  },
  getMostRecent: () => {
    return axios.get("/activities/now");
  },
  remove: id => {
    return axios.delete(`/activities/${id}`);
  },
  clear: activities => {
    return axios.put(`/activities`, { activities });
  }
};
