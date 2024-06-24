import "dotenv/config";
import path from "node:path";
import express from "express";
import { registrateApiV1Routes } from "./api/v1/routes.js";
import { registrateViewRoutes } from "./views/routes/index.js";

const PORT = process.env.PORT || 6666;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

registrateApiV1Routes(app);
registrateViewRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
