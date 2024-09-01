import { MongoClient, UUID } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export async function createStudent(
  client: MongoClient,
  email: string,
  password: string
) {
  try {
    await client.connect();
    const db = client.db("users");
    const coll = db.collection("students");
    const doc = { id: uuidv4(), email, password };
    const result = await coll.insertOne(doc);
    return { success: true,data:result };
  } catch (error) {
    return { success: false };
  } finally {
    client.close();
  }
}
