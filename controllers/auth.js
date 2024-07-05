const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestErrorn, UnauthenticatedError } = require("../errors/index");

const registerUserController = async (request, response) => {
  const { name, email, password } = request.body;
  const tempUser = {
    name,
    email,
    password,
  };
  const user = new userModel({ ...tempUser });
  const savedUser = await user.save();
  const token = savedUser.createJWT();
  response.cookie("token", token);
  return response.status(StatusCodes.CREATED).json({
    user: { name: savedUser.name },
    token,
  });
};

const loginUserController = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // comapre the password here

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // =======

  const token = user.createJWT();
  response.cookie("token", token);
  return response.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

module.exports = { registerUserController, loginUserController };
