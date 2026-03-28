
import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connectMongoDB(): Promise<Db> {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL must be set in environment variables");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    db = client.db('leetcode_tracker');
    console.log('Connected to MongoDB');
  }

  return db;
}

export function getDB(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectMongoDB() first');
  }
  return db;
}

export async function closeMongoDB(): Promise<void> {
  if (client) {
    await client.close();
  }
}
