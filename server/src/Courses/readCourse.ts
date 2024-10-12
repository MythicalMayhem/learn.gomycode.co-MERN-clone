import { MongoClient } from "mongodb"

export const getCourse = async (client: MongoClient, id: string) => {
	try {
		await client.connect()
		const db = client.db("gomycode")
		const coll = db.collection("courses")
		const cursor = await coll.findOne({ id: id })
		return { success: true, data: cursor }
	} catch (error) {
		console.log(error)
		return { success: false, data: { error: "course not found" } }
	} finally {
		client.close()
	}
}
