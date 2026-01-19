import app from "@src/app";
import { closeDatabase, initializeDatabase } from "@src/database/mongo.database";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const DB_CONN_STR = process.env.DB_CONN_STR || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "ktpm-database";

app.listen(PORT, async () => {
  await initializeDatabase(DB_CONN_STR, DB_NAME);
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDatabase();
  process.exit(0);
});

export default app;
