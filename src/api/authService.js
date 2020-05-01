import axios from "axios";
import { setAuthHeader } from "./";

export const authService = {
  login: async credentials => {
    const { data } = await axios.post("/auth/login", credentials);
    setAuthHeader(data.access_token);
    return data;
  },
  authenticate: async token => {
    if (token) {
      const { data } = await axios.post("/auth/user", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAuthHeader(token);

      return { user: data };
    }
  },
  logout: async () => {
    const { data } = await axios.post("/auth/logout");
    if (data) {
      localStorage.removeItem("access_token");
      window.location.replace("/login");
    }

    return null;
  },
  register: async credentials => {
    const { data } = await axios.post("/auth/register", credentials);
    setAuthHeader(data.access_token);
    return data;
  }
};
