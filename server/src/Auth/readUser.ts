import { MongoClient } from "mongodb"

export async function getStudentByEmail(
	client: MongoClient,
	email: string,
	password: string
) {
	try {
		await client.connect()
		const db = client.db("users")
		const coll = db.collection("students")
		const cursor = await coll.findOne({ email, password })

		return { success: true, data: cursor }
	} catch (error: any) {
		return { success: false, data: "user not found" }
	} finally {
		client.close()
	}
}
