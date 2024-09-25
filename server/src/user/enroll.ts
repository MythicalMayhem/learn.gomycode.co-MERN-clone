import { CursorFlag, MongoClient } from "mongodb"

export const enrollUser = async (
	client: MongoClient,
	userid: string,
	courseid: string
) => {
	try {
		client.connect()
		const gmcdb = client.db("gomycode")
		const courses = gmcdb.collection("courses")
		if ((await courses.countDocuments({ id: courseid })) === 0)
			throw new Error("course unexistant")

		const usersdb = client.db("users")
		const users = usersdb.collection("students")
		if ((await users.countDocuments({ id: userid })) === 0)
			throw new Error("user unexistant")

		const update = {
			$set: {
				progress: {
					[courseid]: {
						meetingApproved: true,
						progress: 0,
					},
				},
			},
		}

		//! ["progress." + courseid + ".progress"]: 10,
		const result = await users.updateOne({ id: userid }, update)
	} catch (error) {
		console.log(error)
	} finally {
		client.close()
	}
}
