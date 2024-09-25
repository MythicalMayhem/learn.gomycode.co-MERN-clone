import { MongoClient } from "mongodb"
export async function createCourse(client: MongoClient, course: any) {
	try {
		await client.connect()
		const db = client.db("gomycode")
		const ref = db.collection("courses")
		const result = await ref.insertOne(course)
		return { success: true, data: result }
	} catch (error: any) {
		return { success: false, data: null }
	} finally {
		await client.close()
	}
}
