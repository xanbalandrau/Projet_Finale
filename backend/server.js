require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./src/db/db");

const userRoutes = require("./src/routes/userRoutes");
const skillRoutes = require("./src/routes/skillRoutes");

connectDb();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
