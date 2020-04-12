import axios from "axios";

export const activitiesService = {
  get: () => {
    return axios.get("/activities");
  },
  remove: id => {
    return axios.delete(`/activities/${id}`);
  },
  clear: activities => {
    return axios.put(`/activities`, { activities });
  }
};
