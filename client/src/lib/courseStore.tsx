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
    pages: page[]
}

interface checkpoint {
    id: string
    name: string
    chapters: { [id: string]: chapter }
}

interface course {
    checkpoints: { [id: string]: checkpoint }
    id: string,
    name: string
    image?: any
}

interface CourseStorage {
    courseData: course | null
    setCourseData: (data: course) => void
}

export const courseStore = create<CourseStorage>((set) => (
    {
        courseData: null,
        setCourseData: (data: course) => {
            set({ courseData: data })},
    })
)