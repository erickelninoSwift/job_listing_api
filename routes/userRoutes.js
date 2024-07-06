const express = require("express");
const router = express.Router();
const { getAllusers } = require("../controllers/user");

router.get("/", getAllusers);

module.exports = router;
