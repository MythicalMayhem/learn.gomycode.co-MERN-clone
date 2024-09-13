import { useEffect, useState } from "react"
import { Course } from "./AddCourse"
import { CourseCard } from "../courses/courseCard"
import { userStore } from "../../lib/userStore"

function Courses() {
	const [courses, setCourses] = useState<Array<Course>>([])
	const user = userStore()
	useEffect(() => {
		fetch("http://127.0.0.1:3001/courses")
			.then((res) => res.json())
			.then((res) => {
				setCourses(res)
			})
	}, [])
	function handleEnroll(id: string) {
		console.log(user);
		
		fetch('http://127.0.0.1:3001/enroll', {
			headers: {
				"userid": user.currentUser.id,
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
