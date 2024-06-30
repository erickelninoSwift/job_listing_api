const express = require("express");

const registerUserController = async (request, response) => {
  return response.send("Register User");
};

const loginUserController = async (request, response) => {
  return response.send("Loggin User");
};

module.exports = { registerUserController, loginUserController };
