import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("opspilot-user"));

    if (user) {
      config.headers.Authorization = `Bearer fake-token-${user.role}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("opspilot-user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
