import { courseStore } from "../../../lib/courseStore";

function MyCourse() {
    const course = courseStore()

    return (
        <div className="my-course">
            <h1>{course.courseData?.name}</h1>
            <h2>
                page  = {course.currentWindow.pageIndex + 1}    / {course.courseData?.checkpoints[course.currentWindow.checkpointIndex].chapters[course.currentWindow.chapterIndex].pages.length}
            </h2>
            <h3>
                chapter  = {course.currentWindow.chapterIndex + 1} / {course.courseData?.checkpoints[course.currentWindow.checkpointIndex].chapters.length}
            </h3>
            <h4>
                checkpoint  = {course.currentWindow.checkpointIndex + 1} / {course.courseData?.checkpoints.length}
            </h4>
            <button onClick={() => course.advance()}>  A D V A N C E  </button>
            <button onClick={() => course.fallback()}> F A L L B A C K </button>
        </div>
    );
}

export default MyCourse;