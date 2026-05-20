import { create } from "zustand";

const useToastStore = create((set) => ({
  message: "",
  showToast: (msg) => {
    set({ message: msg });

    setTimeout(() => {
      set({ message: "" });
    }, 3000);
  },
}));

export default useToastStore;
