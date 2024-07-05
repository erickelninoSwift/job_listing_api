const express = require("express");
const router = express.Router();

const {
  getAlljobController,
  getJobController,
  addJobController,
  deleteJobController,
  updateJobController,
} = require("../controllers/jobs");

router.get("/", getAlljobController);
router.get("/:id", getJobController);
router.post("/", addJobController);
router.delete("/:id", deleteJobController);
router.patch("/:id", updateJobController);

module.exports = router;
