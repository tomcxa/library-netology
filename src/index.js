import "dotenv/config";
import express from "express";
import { registrateApiV1Routes } from "./api/v1/routes.js";

const PORT = process.env.PORT || 6666;

const app = express();
// app.use(express.static("public"));
app.use(express.json());

registrateApiV1Routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
