import { create } from "zustand"
import { Checkpoints } from "../components/admin/AddCourse"

interface course {
    checkpoints: Checkpoints
    id: string,
    name: string
}
interface data {
    courseData: course | null
    setCourseData: (data: course) => void
    nextPage: () => void
    maxPageIndex: number,
    maxCheckPointIndex: number,
    currentPage: number,
    currentCheckPoint: number,
}

export const courseStore = create<data>((set) => (
    {
        courseData: null,
        currentPage: 0,
        currentCheckPoint: 1,
        maxCheckPointIndex: 0,
        maxPageIndex: 0,
        setCourseData: (data: course) => {
            set({
                courseData: data,
                maxCheckPointIndex: Object.keys(data.checkpoints).length,
                maxPageIndex: Object.keys(data.checkpoints[Object.keys(data.checkpoints)[0]].pages).length,
            })
        },
        nextPage: () => {
            set((state: data) => {
                if ((state.maxCheckPointIndex <= state.currentCheckPoint) && (state.currentPage + 1 >= state.maxPageIndex)) return {}
                return (state.currentPage + 1 >= state.maxPageIndex)
                    ? {
                        currentPage: 0,
                        currentCheckPoint: state.currentCheckPoint + 1
                    } : { currentPage: state.currentPage + 1, }
            })
            console.log("eeeeeaze");
        }
    })
)