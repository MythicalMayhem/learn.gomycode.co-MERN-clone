import "dotenv/config"
import express, { NextFunction } from "express"
import cors from "cors"

import { MongoClient } from "mongodb"
import { Request, Response } from "express"

import { readAllCourses } from "./Courses/readAllCourses"
import { createCourse } from "./Courses/createCourse"
import { getStudentByEmail } from "./Auth/readUser"
import { createStudent } from "./Auth/createUser"
import { getCourse } from "./Courses/readCourse"
import { updateProgress } from "./user/updateProgress"
import { enrollUser } from "./user/enroll"

const app = express()
const client = new MongoClient(process.env.MONGODB_URI || "")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
		optionsSuccessStatus: 200,
	})
)
app.listen(3001, () => console.log("server running on 3001"))

app.get("/courses", async (req: Request, res: Response) => {
	res.json(await readAllCourses(client))
})
app.post("/AddCourse", (req: Request, res: Response) => {
	res.json(createCourse(client, req.body ?? {}))
	res.status(209)
})

app.get(
	"/signin",
	(req: Request, res: Response, next: NextFunction) => {
		const headers = req.headers
		const isValid = headers && headers.password && headers.email
		if (isValid) return next()
		res.status(403)
		res.send({ success: false, data: "invalid data" })
	},
	async (req: Request, res: Response) => {
		const user = await getStudentByEmail(
			client,
			String(req.headers?.email) || "",
			String(req.headers?.password) || ""
		)
		res.send(user)
	}
)

app.get(
	"/signup",
	(req: Request, res: Response, next: NextFunction) => {
		const headers = req.headers
		const isvalid = headers && headers.password && headers.email
		if (isvalid) return next()
		res.status(403)
		res.send({ sucess: false, data: "invalid data" })
	},
	async (req: Request, res: Response) => {
		const user = await createStudent(
			client,
			String(req.headers?.email) || "",
			String(req.headers?.password) || ""
		)
		res.send(user)
	}
)
app.post("/enroll", (req: Request, res: Response) => {
	const courseid = req.body.id
	const userid = req.headers.userid
	console.log(courseid)

	if (!userid) return res.status(405)
	enrollUser(client, userid as string, courseid)
})

app.get("/getCourse", async (req: Request, res: Response) => {
	if (!req.headers.courseid)
		return res.send({ success: false, data: { error: "invalid data" } })
	res.send(await getCourse(client, String(req.headers.courseid)))
})

app.post("/updateProgress", async (req: Request, res: Response) => {
	const { email, password, courseid, checkpointIndex, chapterIndex } =
		req.body
	console.log(req.body)
	res.send(
		await updateProgress(
			client,
			email,
			password,
			courseid,
			checkpointIndex,
			chapterIndex
		)
	)
})

app.post("/getStudentsInfo", async (req: Request, res: Response) => {
	const { instructorEmail, instructorPassword } = req.body
})
app.post("/approveMeeting", async (req: Request, res: Response) => {
	const { instructorEmail, instructorPassword, whichStudent } = req.body
})
