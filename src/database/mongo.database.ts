import {
  CreateIndexesOptions,
  Db,
  IndexSpecification,
  MongoClient,
} from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

const getDb = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase first.");
  }
  return db;
};

export const initializeDatabase = async (connStr: string, dbName: string) => {
  if (db) {
    console.warn("Database already initialized");
    return db;
  }

  try {
    client = await MongoClient.connect(connStr);
    db = client.db(dbName);

    await db.command({ ping: 1 });
    console.log(`Connected to MongoDB: ${dbName}`);

    await setupIndexes(db);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

interface IndexDefinition {
  collection: string;
  index: IndexSpecification;
  options?: CreateIndexesOptions;
}

const setupIndexes = async (db: Db): Promise<void> => {
  const indexes: IndexDefinition[] = [
    {
      collection: "tai-khoan",
      index: { tenDangNhap: 1 },
      options: { unique: true },
    },
    {
      collection: "nhan-vien",
      index: { soCCCD: 1 },
      options: { unique: true },
    },
    {
      collection: "nhan-vien",
      index: { soDienThoai: 1 },
      options: { unique: true },
    },
  ];

  for (const { collection, index, options } of indexes) {
    try {
      await db.collection(collection).createIndex(index, options);
    } catch (error) {
      console.warn(`Index creation warning for ${collection}:`, error);
    }
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    if (!db) return false;
    await db.command({ ping: 1 });
    return true;
  } catch {
    return false;
  }
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

export default getDb;
