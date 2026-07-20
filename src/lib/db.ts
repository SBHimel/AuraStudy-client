import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!dbName) {
  throw new Error('Invalid/Missing environment variable: "AUTH_DB_NAME"');
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoDb: Db | undefined;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let db: Db;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the MongoClient and Db instances
  // across module reloads caused by HMR (Hot Module Replacement) in Next.js.
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri);
  }
  client = globalThis._mongoClient;

  if (!globalThis._mongoDb) {
    globalThis._mongoDb = client.db(dbName);
  }
  db = globalThis._mongoDb;

  if (!globalThis._mongoClientPromise) {
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production mode, avoid global state pollution
  client = new MongoClient(uri);
  db = client.db(dbName);
  clientPromise = client.connect();
}

export { client, db, clientPromise };
