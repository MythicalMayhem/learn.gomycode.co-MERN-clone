import { useEffect, useState } from "react"
import { Course } from "./AddCourse"
import { CourseCard } from "../courses/courseCard"

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
	function handleEnroll(id: string) {
		fetch('http://127.0.0.1:3001/enroll', {
			headers: {
				"userid": 'cb247011-0853-4df6-88bd-f706aa784c42',
				"Content-Type": 'application/json'
			},
			body: JSON.stringify({ id }),
			method: 'POST'
		})
	}
	return (
		<>
			<h1>All Courses</h1>
			{courses.map((course, i) => (
				<>
					<CourseCard course={course} _key={i} handleEnroll={handleEnroll} />
				</>
			))}
		</>
	)
}

export default Courses
