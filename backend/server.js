require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const connectDb = require("./src/config/db");
const morganMiddleware = require("./src/middleware/morganMiddleware");
const userRoutes = require("./src/routes/userRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(helmet());
app.use(cors());

connectDb();

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
