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
  try {
    if (!email || !password) {
      return response.status(StatusCodes.NO).json({
        msg: "please provide password or email",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return response.status(StatusCodes.UNAUTHORIZED).json({
        msg: "wrong credentials",
      });
    }

    // comapre the password here

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response.status(StatusCodes.NOT_FOUND).json({
        msg: "wrong password",
      });
    }
    // =======
    const token = user.createJWT();
    response.cookie("token", token);
    return response.status(StatusCodes.OK).json({
      user: { name: user.name },
      token,
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

module.exports = { registerUserController, loginUserController };
