import { fetchFromLocalStorage } from "./";

export const prioritiesService = {
  get: () => fetchFromLocalStorage("priorities")
};
