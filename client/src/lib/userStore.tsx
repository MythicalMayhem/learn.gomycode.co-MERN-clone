/* eslint-disable no-unreachable */
import { create } from "zustand";

interface user {
  currentUser: {
    id: string
    progress: { [courseid: string]: { meetingApproved: boolean, progress: { checkpoint: number, chapter: number } } }
  } | any
  login: (email: string, password: string) => void,
  logout: () => void,
  updateProgress: (courseId: string, checkpointIndex: number, chapterindex: number) => void,
}
export const userStore = create<user>((set) => ({
  currentUser: null,
  logout: () => set({ currentUser: null }),
  login: (email: string, password: string) => fetch("http://127.0.0.1:3001/signin", {
    method: "GET",
    headers: {
      email,
      password
    },
  })
    .then(res => res.json())
    .then(res => res.success ? set({ currentUser: res.data }) : null)
 
  ,
  updateProgress: (courseid: string, checkpointIndex: number, chapterIndex: number) => {
    console.log("updating ",courseid);
    
    fetch("http://127.0.0.1:3001/updateProgress", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      "body": JSON.stringify({
        email: "d",
        password: "d",
        courseid, checkpointIndex, chapterIndex,
      })
    })
  }
}));
