const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors/index");

const authMiddleWare = async (request, response, next) => {
  const AuthHeader = request.cookies.token;

  if (!AuthHeader) {
    throw new UnauthenticatedError("Please make sure you logged in");
  }
  // const token = AuthHeader.split(" ")[1];
  const token = request.cookies.token;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the job routes
    request.user = {
      userID: payload.userID,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalide Credentials");
  }
};
module.exports = { authMiddleWare };
