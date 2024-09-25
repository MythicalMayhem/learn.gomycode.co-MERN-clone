import { MongoClient } from "mongodb"
export async function readAllCourses(client: MongoClient) {
	try {
		await client.connect()
		const db = client.db("gomycode")
		const coll = db.collection("courses")
		const cursor = coll.find()

		const data: Array<any> = []
		for await (const item of cursor) {
			if (item) data.push(item)
		} 
		return { success: true, data: data }
	} catch (error: any) {
		return { success: false, data: null }
	} finally {
		client.close()
	}
}
