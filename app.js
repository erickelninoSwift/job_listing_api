require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const JobsRouter = require("./routes/jobs");
const Authroutes = require("./routes/auth");
const { connectDB } = require("./db/connect");
const { authMiddleWare } = require("./middleware/authentication");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
app.use(express.json());
// extra packages

app.use(cookieParser());
// routes
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello world",
  });
});

// Jobes and Auth middleware
app.use("/api/v1/auth", Authroutes);
app.use("/api/v1/jobs", authMiddleWare, JobsRouter);

// =============================

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
