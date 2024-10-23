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
  id?: string,
  name: string,
  students: Array<student>
  approveMeeting: (studentId: string) => void
}

export const instructorStore = create<instructor>((set) => ({
  id: undefined,
  name: "loading name",
  students: [
    {
      id: "123456789",
      name: "dummy",
      meetingApproved: false,
      age: 10,
      progress: {
        "123456789": {
          meetingApproved: false,
          progress: {
            checkpointIndex: 10,
            chapterIndex: 10
          }
        }
      }
    }
  ]
  ,

  approveMeeting: async (studentId) => {

  },

}))