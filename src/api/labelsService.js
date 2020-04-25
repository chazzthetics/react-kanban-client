import { fetchFromLocalStorage } from "./";

export const labelsService = {
  get: () => fetchFromLocalStorage("labels")
};
