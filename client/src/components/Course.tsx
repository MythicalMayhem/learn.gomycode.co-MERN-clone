import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Course() {
    const [params] = useSearchParams()
    const [courseData, setCourseData] = useState()
    useEffect(() => {
        // const aborter = new AbortController()

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
            .then(res => setCourseData(res))
    }, [params])
    console.log(courseData);

    return (<>
        <h1>E</h1>
        <ul>
            {params.get('id')}
        </ul>
    </>);
}

export default Course;