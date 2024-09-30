import { useSearchParams } from "react-router-dom";
import CourseOverView from "./overview/mainoverview";
import { useEffect, useState } from "react";
import { courseStore } from "../../lib/courseStore";
import MyCourse from "./course/mycourse";

function CoursePager() {
    const [params] = useSearchParams()
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


    console.log(course);
    switch (page) {
        case 'overview':
            return <CourseOverView />
        case "learn":
            return <><MyCourse /></>
        default:
            return <>Page Not Found 044</>;
    }
}

export default CoursePager;