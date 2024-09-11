import { useEffect, useState } from "react"
import { Course } from "./AddCourse"
function Courses() {
	const [courses, setCourses] = useState<Array<Course>>([])
	useEffect(() => {
		fetch("http://127.0.0.1:3001/courses")
			.then((res) => res.json())
			.then((res) => {
				console.log()
				setCourses(res)
			})
	}, [])

	return (
		<>
            <h1>All Courses</h1>
			{courses.map((course, i) => (
				<div key={i}>
					<pre> {JSON.stringify(course,null,2)}</pre> <br />
				</div>
			))}
		</>
	)
}

export default Courses
