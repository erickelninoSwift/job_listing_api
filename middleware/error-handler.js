const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "somthing went wrong",
  };

  if (err.name) {
    customError.msg = err.message;
    customError.statusCode = 400;
  }
  if (err.errorResponse.code && err.errorResponse.code === 11000) {
    customError.msg = `Duplicate Email : ${Object.keys(
      err.errorResponse.keyValue
    )} field , please chose another value`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
