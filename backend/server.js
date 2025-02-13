require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const connectDb = require("./src/db/db");

const userRoutes = require("./src/routes/userRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const errorHandler = require("./src/middleware/errorHandler");

connectDb();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(logger("dev"));

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
