const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestErrorn, UnauthenticatedError } = require("../errors/index");

const registerUserController = async (request, response) => {
  const { name, email, password } = request.body;
  try {
    if (!name || !email || !password) {
      throw new BadRequestError("Please make sure you provide all fields ");
    }

    const findUser = await userModel.findOne({ email: email });
    if (findUser) {
      return response.status(StatusCodes.FORBIDDEN).json({
        message: "the current email already exist in our db",
      });
    }
    const tempUser = {
      name,
      email,
      password,
    };
    const user = new userModel({ ...tempUser });

    const savedUser = await user.save();

    if (!savedUser) {
      return response.status(StatusCodes.EXPECTATION_FAILED).json({
        message: "There was an error while trying to save datat",
      });
    }
    const token = savedUser.createJWT();
    return response.status(StatusCodes.CREATED).json({
      user: { name: savedUser.name },
      token,
    });
  } catch (error) {}
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
  return response.status(StatusCodes.OK).json({
    user: { name: user.name },
    token,
  });
};

module.exports = { registerUserController, loginUserController };
