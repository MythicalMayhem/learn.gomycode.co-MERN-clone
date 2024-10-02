import { courseStore } from "../../../lib/courseStore";

function MyCourse() {
    const course = courseStore()
    const { checkpointIndex, chapterIndex, pageIndex } = course.currentWindow
    return (
        <div className="my-course">
            <h1>{course.courseData?.name}</h1>
            <h2>
                page  = {pageIndex + 1}    / {course.courseData?.checkpoints[checkpointIndex].chapters[chapterIndex].pages.length}
            </h2>
            <h3>
                chapter  = {chapterIndex + 1} / {course.courseData?.checkpoints[checkpointIndex].chapters.length}
            </h3>
            <h4>
                checkpoint  = {checkpointIndex + 1} / {course.courseData?.checkpoints.length}
            </h4>
            <button onClick={() => course.advance()}> A D V A N C E  </button>
            <button onClick={() => course.fallback()}> F A L L B A C K </button>
            <main className="book">
                <pre>
                    {JSON.stringify(course.courseData?.checkpoints[checkpointIndex].chapters[chapterIndex].pages[pageIndex],null,1)}
                </pre>
            </main>
        </div>
    );
}

export default MyCourse;