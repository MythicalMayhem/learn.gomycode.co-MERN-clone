import { create } from "zustand"

enum pageType { 'static', 'order', 'quiz' }
interface page {
    title: string
    type: pageType
    content: {
        desc?: string
        slideshow?: string[]

        full?: string
        pool?: number[]

        options?: string[]
        correct?: number
    }
}

interface chapter {
    id: string
    name: string
    pages: Array<page>
}

interface checkpoint {
    id: string
    name: string
    chapters: Array<chapter>
}

interface course {
    checkpoints: checkpoint[]
    id: string,
    name: string
    image?: any
}

interface CourseStore {
    courseData: course | null
    currentWindow: { checkpointIndex: number, chapterIndex: number, pageIndex: number },
    setCourseData: (data: course) => void
    advance: () => void
    fallback: () => void
}

export const courseStore = create<CourseStore>((set) => (
    {
        maxPages: 0, //All pages in course 
        currentWindow: { checkpointIndex: 0, chapterIndex: 0, pageIndex: 0 },
        courseData: null,
        setCourseData: (data: course) => set({ courseData: data }),
        advance: () => set((state: CourseStore) => {
            if (!state.courseData) return {}
            const cw = { ...state.currentWindow }
            cw.pageIndex++ 
            if (cw.pageIndex >= state.courseData?.checkpoints[cw.checkpointIndex].chapters[cw.chapterIndex].pages.length) {
                cw.pageIndex = 0
                cw.chapterIndex += 1
            }
            if (cw.chapterIndex >= state.courseData?.checkpoints[cw.checkpointIndex].chapters.length) {
                cw.pageIndex = 0
                cw.chapterIndex = 0
                cw.checkpointIndex += 1
            }
            if (cw.checkpointIndex >= state.courseData?.checkpoints.length) {
                cw.pageIndex = 0
                cw.chapterIndex = 0
                cw.checkpointIndex = state.courseData?.checkpoints.length - 1
                console.log('course is over');
            } 
            console.log(cw);
            
            return {currentWindow:cw}
        }),
        fallback: () => set((state: CourseStore) => {
            if (!state.courseData) return {}
            const cw = { ...state.currentWindow }
            cw.pageIndex--
            if (cw.pageIndex < 0) {
                cw.chapterIndex = Math.max(cw.chapterIndex - 1, 0)
                cw.pageIndex = state.courseData.checkpoints[cw.checkpointIndex].chapters[cw.chapterIndex].pages.length - 1
            }
            if (cw.chapterIndex < 0) {
                cw.checkpointIndex = Math.max(cw.checkpointIndex - 1, 0)
                cw.chapterIndex = state.courseData.checkpoints[cw.checkpointIndex].chapters.length - 1
                cw.pageIndex = state.courseData.checkpoints[cw.checkpointIndex].chapters[cw.chapterIndex].pages.length - 1
            }
            if (cw.checkpointIndex < 0) {
                cw.checkpointIndex = Math.max(cw.checkpointIndex - 1, 0)
                cw.chapterIndex = 0
                cw.pageIndex = 0
                console.log('course begin');
            }
            return {currentWindow:cw}
        }),
    })
)