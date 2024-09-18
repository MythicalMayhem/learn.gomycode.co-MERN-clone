import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { courseStore } from "../lib/courseStore";

function Course() {
    const [params] = useSearchParams()
    const course = courseStore()


    useEffect(() => {
        fetch("http://127.0.0.1:3001/getCourse", {
            method: "GET",
            headers: {
                username: "d",
                password: "d",
                courseid: params.get('id') || "",
                "Content-Type": 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                course.setCourseData(res.data)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <h1>{course?.courseData?.name}</h1>
        <strong>CheckPoints</strong>{course?.currentCheckPoint   + " / " + course?.maxCheckPointIndex} <br />
        <em>Page  = </em>{course?.currentPage + 1 + " / " + course?.maxPageIndex}


        <button onClick={() => course?.nextPage()}>NEXT page</button>

        <pre>
            {JSON.stringify(course?.courseData?.checkpoints[Object.keys(course?.courseData?.checkpoints)[course.currentCheckPoint - 1]])}

        </pre>
    </>);
}

export default Course;