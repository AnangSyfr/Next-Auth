import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist((set) => ({
    user: [],
    setUser: (newUser) => set({ user: newUser }),
  }))
);

export default useUserStore;
