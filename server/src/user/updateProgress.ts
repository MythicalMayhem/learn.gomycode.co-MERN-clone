import { MongoClient, UUID } from "mongodb"

export async function updateProgress(
	client: MongoClient,
	email: string,
	password: string,
	courseid: string,
	checkpointIndex: number,
	chapterIndex: number
) {
	try {
		await client.connect()

		const db = client.db("users")
		const coll = db.collection("students")
		const result = await coll.findOne({
			email: email,
			password: password,
		})
		if (!result) throw new Error("user not found")
		const update = {
			["progress.123456789.progress"]: {
				checkpointIndex:0,
				chapterIndex:100,
			},
		}
		await coll.updateOne({
			email,
			password,
		}, 
			[{'$set': {'progress': {[courseid]: {
				progress:{ 
					checkpoint:checkpointIndex,
					chapter:chapterIndex,
			}
			},}}}])


		console.log('updated');
		
	} catch (error) {
		return { success: false, data: { error } }
	} finally {
		client.close()
	}
}
