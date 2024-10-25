import { create } from "zustand";

export interface student {
  id: string,
  name: string,
  age: number,
  progress:
  {
    [courseid: string]: {
      meetingApproved: boolean
      progress: {
        checkpointIndex: number
        chapterIndex: number
      }
    }
  }

}
interface instructor {
  password:string,
  email:string,
  id?: string,
  name: string,
  students: Array<student>
  approveMeeting: (studentId: string) => void
  login: (email: string, password: string) => void
}

export const instructorStore = create<instructor>((set) => ({
  id: undefined,
  password:"a",
  email:"a",
  name: "loading name",
  students: [],
  login: (email: string, password: string) => fetch("http://127.0.0.1:3001/instructorLogin", {
    headers: {
      "Content-Type": "Application/json",
      email: "a",
      password: "a",
    }
  }
  ).then(res => res.json())
    .then((res) => set((state) => ({ ...state, ...res }))), 
  approveMeeting: async (studentId) => {

  },

}))