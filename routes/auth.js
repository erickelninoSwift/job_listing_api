const express = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", registerUserController);
router.get("/login", loginUserController);

module.exports = router;
