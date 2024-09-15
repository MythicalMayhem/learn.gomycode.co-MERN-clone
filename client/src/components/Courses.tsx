import { useEffect, useState } from "react"
import { Course } from "./admin/AddCourse"
import { CourseCard } from "./courses/courseCard"
import { userStore } from "../lib/userStore"

function Courses() {
	const [courses, setCourses] = useState<Array<Course>>([])
	const user = userStore()
	useEffect(() => {
		fetch("http://127.0.0.1:3001/courses")
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					setCourses(res.data)
				}
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

			<ul>
				{
					courses.map((course, i) => (
						<li key={i}>
							<CourseCard course={course} _key={i} handleEnroll={handleEnroll} />
						</li>
					))}
			</ul>
		</>
	)
}

export default Courses
