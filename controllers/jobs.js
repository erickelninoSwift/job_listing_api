const jobsModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, NotFoundError } = require("../errors/index");
const getAlljobController = async (request, response) => {
  return response.json({
    user: request.user,
  });
};

const getJobController = async (request, response) => {
  return response.send("get a signle job ");
};

const addJobController = async (request, response) => {
  request.body.createdby = request.user.userID;
  try {
    const job = new jobsModel(request.body);
    await job.save();

    return response.status(StatusCodes.CREATED).json({ job });
  } catch (error) {}
};

const deleteJobController = async (request, response) => {
  return response.send("delete a job");
};

const updateJobController = async (request, response) => {
  return response.send("update jobs");
};

module.exports = {
  getAlljobController,
  getJobController,
  addJobController,
  deleteJobController,
  updateJobController,
};
