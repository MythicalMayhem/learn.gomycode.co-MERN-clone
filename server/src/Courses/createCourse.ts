import { MongoClient } from "mongodb"; 
export async function createCourse(client: MongoClient, course:any) {
  try {
    console.log(course)
    await client.connect();
    const db = client.db("courses");
    const ref = db.collection(course.id);
//    await ref.insertOne(course);

  } finally { 
    await client.close();
  }
}
