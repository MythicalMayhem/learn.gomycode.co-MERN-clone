import { create } from "zustand";

interface user {
  currentUser: {
    id: string
    progress: number
  } | any
  login: (email: string, password: string) => void,
  logout: () => void,
}
export const userStore = create<user>((set) => ({
  currentUser: null,
  logout: () => set({ currentUser: null }),
  login: (email: string, password: string) => {
    console.log('bor');
    
    fetch("http://127.0.0.1:3001/signin", {
      method: "GET",
      headers: {
        email,
        password
      },
    })
      .then(res => res.json())
      .then(res => res.success ? set({ currentUser: res.data }) : null);
  },
}));
