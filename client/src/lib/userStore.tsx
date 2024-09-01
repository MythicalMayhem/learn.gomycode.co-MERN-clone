import { create } from "zustand";

export const userStore = create((set) => ({
  currentUser: null,
  logout: () => set({ currentUser: null }),
  login: (email: string, password: string) => {
    fetch("http://127.0.0.1:3001/login", {
      method: "GET",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
  
}));
