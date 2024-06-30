const express = require("express");
const router = express.Router();
const {
  registerUserController,
  loginUserController,
} = require("../controllers/auth");

router.get("/login", loginUserController);
router.post("/register", registerUserController);

module.exports = router;
