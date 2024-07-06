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
const allUsers = require("./routes/userRoutes");

// security package
// ===============
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

// ================
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Redis, Memcached, etc. See below.
//   })
// );
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());

// extra packages

app.use(cookieParser());
// routes
app.get("/", (req, res) => {
  return res.send("<h1>Welcome to Jobs APIs </h1>");
});

// Jobes and Auth middleware
app.use("/api/v1/auth", Authroutes);
app.use("/api/v1/jobs", authMiddleWare, JobsRouter);
app.use("/api/v1/users", authMiddleWare, allUsers);

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
