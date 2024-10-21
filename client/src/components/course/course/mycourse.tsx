import '../../../styles/course.css'
import { courseStore } from "../../../lib/courseStore";
import Order from "./orderPage";
import Quiz from "./quizPage";
import Static from "./staticPage";
import { userStore } from '../../../lib/userStore';


function MyCourse() {
    const user = userStore()
    const course = courseStore()
    const { checkpointIndex, chapterIndex, pageIndex } = course.currentWindow
    const page = course.courseData?.checkpoints[checkpointIndex].chapters[chapterIndex].pages[pageIndex]



    return (
        <div className="my-course">
            <h1>{course.courseData?.name}</h1>

            <main className="book">

                {/* 
                <small>checkpoint  = {checkpointIndex + 1} / {course.courseData?.checkpoints.length} </small>
                <small>chapter  = {chapterIndex + 1} / {course.courseData?.checkpoints[checkpointIndex].chapters.length} </small>
                */}

                <small>checkpoint</small><h1 className="checkpoint-name">  {course.courseData?.checkpoints[checkpointIndex].name}</h1>
                <h2 className="chapter-name"> chapter : {course.courseData?.checkpoints[checkpointIndex].chapters[chapterIndex].name}</h2>
                <p className="page-content">
                    {page?.type === "static" && <Static page={page} />}
                    {page?.type === "order" && <Order page={page} />}
                    {page?.type === "quiz" && <Quiz page={page} />}
                </p>
            </main>
            <div className='buttons'>
                <button onClick={() => course.fallback()}> {'<'} </button>
                <small>{pageIndex + 1}    / {course.courseData?.checkpoints[checkpointIndex].chapters[chapterIndex].pages.length} </small>
                <button onClick={() => course.advance(() => course.courseData?.id && user.updateProgress(course.courseData?.id, course.currentWindow.checkpointIndex, course.currentWindow.chapterIndex))} > {'>'}   </button>
            </div>
        </div>
    );
}

export default MyCourse;