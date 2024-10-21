import { create } from "zustand"

export interface page {
    title: string
    type: 'static' | 'order' | 'quiz'
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
    advance: (updateProgress: Function) => void
    fallback: () => void
}

export const courseStore = create<CourseStore>((set) => (
    {
        maxPages: 0, //All pages in course 
        currentWindow: { checkpointIndex: 0, chapterIndex: 0, pageIndex: 0 },
        courseData: null,
        setCourseData: (data: course) => set({ courseData: data }),
        advance: (updateProgress: Function) => set((state: CourseStore) => {
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
                updateProgress()
            }
            if (cw.checkpointIndex >= state.courseData?.checkpoints.length) {
                cw.checkpointIndex = state.courseData?.checkpoints.length - 1
                cw.chapterIndex = state.courseData?.checkpoints[cw.checkpointIndex].chapters.length - 1
                cw.pageIndex = state.courseData?.checkpoints[cw.checkpointIndex].chapters[cw.chapterIndex].pages.length - 1
            }
            return { currentWindow: cw }
        }),
        fallback: () => set((state: CourseStore) => {
            if (!state.courseData) return {}
            const cw = { ...state.currentWindow }
            cw.pageIndex--
            if (cw.pageIndex < 0) {
                cw.chapterIndex = cw.chapterIndex - 1
                cw.pageIndex = state.courseData.checkpoints[Math.max(cw.checkpointIndex, 0)].chapters[Math.max(cw.chapterIndex, 0)].pages.length - 1
            }
            if (cw.chapterIndex < 0) {
                cw.checkpointIndex = cw.checkpointIndex - 1
                cw.chapterIndex = state.courseData.checkpoints[Math.max(cw.checkpointIndex, 0)].chapters.length - 1
                cw.pageIndex = state.courseData.checkpoints[Math.max(cw.checkpointIndex, 0)].chapters[Math.max(cw.chapterIndex, 0)].pages.length - 1
            }
            if (cw.checkpointIndex < 0) {
                cw.checkpointIndex = 0
                cw.chapterIndex = 0
                cw.pageIndex = 0
            }
            return { currentWindow: cw }
        }),
    })
)