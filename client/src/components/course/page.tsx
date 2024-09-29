import { useSearchParams } from "react-router-dom";
import CourseOverView from "./overview/mainoverview";
import { useEffect, useState } from "react";
import { courseStore } from "../../lib/courseStore";

function CoursePager() {
    const [params, setParams] = useSearchParams()
    const course = courseStore()
    const page = params.get('page')
    const id = params.get('id')

    useEffect(() => {
        if (!id) return
        const controller = new AbortController()
        fetch("http://127.0.0.1:3001/getCourse", {
            "method": "GET",
            signal: controller.signal,
            "headers": {
                username: "d",
                password: "d",
                "Content-Type": 'application/json',
                "courseid": id
            }
        }).then(res => res.json())
            .then(res => course.setCourseData(res.data))

        return () => controller.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getCourseName: () => string = () => {
        return 'fetched course Name'
    }

    const getCheckpoints = () => {
        const client_checkpoints = []
        for (const key in course.courseData?.checkpoints)
            client_checkpoints.push({ id: key, completed: false, score: 0 })
        return client_checkpoints
    }
    console.log(course);

    // * useContextHere
    switch (page) {
        case 'overview':
            return <CourseOverView course_name={getCourseName()} completed={false} checkpoints={getCheckpoints()} />

        default:
            break;
    }
    return (<></>);
}

export default CoursePager;