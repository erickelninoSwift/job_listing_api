const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getAllusers = async (request, response) => {
  try {
    const findAlluser = await userModel.find({ password: 0 });
    if (!findAlluser) {
      return response.status(StatusCodes.NOT_FOUND);
    }

    return response.status(StatusCodes.OK).json({
      users: findAlluser,
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

module.exports = { getAllusers };
