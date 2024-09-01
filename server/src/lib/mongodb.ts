const { MongoClient } = require("mongodb");
import "dotenv/config";

export async function setUpMongoDBClient<MongoClient>() {
  if (!process.env.MONGODB_URI) return console.log("MONGODB_URI doesn't exist");
  while (true) {
    let client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Connected to database !");
      return client;
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
}
 
