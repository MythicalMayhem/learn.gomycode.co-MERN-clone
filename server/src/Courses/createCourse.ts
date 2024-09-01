import { MongoClient } from "mongodb"; 
export async function createCourse(client: MongoClient, course:any) {
  try {
    await client.connect();
    const db = client.db("courses");
    const ref = db.collection(course.courseId);
    await ref.insertMany(course);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
