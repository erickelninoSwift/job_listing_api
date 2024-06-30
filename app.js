require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const JobsRouter = require("./routes/jobs");
const Authroutes = require("./routes/auth");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// Jobes and Auth middleware
app.use("/api/v1/auth", Authroutes);
app.use("/api/v1/jobs", JobsRouter);

// =============================

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
