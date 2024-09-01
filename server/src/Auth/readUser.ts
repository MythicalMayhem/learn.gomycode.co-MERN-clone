import { MongoClient } from "mongodb";

export async function getStudentByEmail(client: MongoClient, email: string) {
  try {
    await client.connect();
    const db = client.db("users");
    const coll = db.collection("students");
    const cursor = coll.find({ email: email });
    const data: any = [];
    for await (const item of cursor) {
      if (item) data.push(item);
    }

    return { success: true, data: data };
  } catch (error: any) {
    return { success: false, data: null };
  } finally {
    client.close();
  }
}
