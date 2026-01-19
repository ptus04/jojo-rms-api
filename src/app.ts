import { healthCheck } from "@src/database/mongo.database";
import { errorHandler } from "@src/middleware/error-handler.middleware";
import authRoute from "@src/router/auth.route";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors()); // TODO: Configure CORS options as needed
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/health", async (_, res) => {
  res.header("X-Version", "1.0.0");

  if (!(await healthCheck())) {
    return res.status(503).send("Service Unavailable");
  }
  res.status(200).send("OK");
});
app.use("/api/auth", authRoute);

app.use(errorHandler);

export default app;
