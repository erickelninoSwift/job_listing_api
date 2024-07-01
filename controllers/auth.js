const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign(
      {
        userID: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      "JAckpotHereJWT",
      { expiresIn: "30d" }
    );
    if (!savedUser) {
      return response.status(StatusCodes.EXPECTATION_FAILED).json({
        message: "There was an error while trying to save datat",
      });
    }

    return response.status(StatusCodes.CREATED).json({
      user: { name: savedUser.name },
      token,
    });
  } catch (error) {}
};

const loginUserController = async (request, response) => {
  return response.send("Loggin User");
};

module.exports = { registerUserController, loginUserController };
