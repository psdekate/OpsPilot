import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem("isAuth") === "true",

  login: () => {
    localStorage.setItem("isAuth", "true");
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("isAuth");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
