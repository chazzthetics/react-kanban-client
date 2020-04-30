import axios from "axios";

export const authService = {
  login: async credentials => {
    //FIXME: split later
    if (localStorage.getItem("access_token")) {
      const { data } = await axios.post("/auth/user", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("access_token")}`;

      return { user: data, access_token: localStorage.getItem("access_token") };
    } else {
      const { data } = await axios.post("/auth/login", credentials);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;

      localStorage.setItem("access_token", data.access_token); // or cookies...decide later

      return data;
    }
  },
  logout: async () => {
    localStorage.removeItem("access_token");

    return await axios.post("/auth/logout");
  },
  register: async credentials => {
    const { data } = await axios.post("/auth/register", credentials);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    localStorage.setItem("access_token", data.access_token);
    return data;
  }
};
