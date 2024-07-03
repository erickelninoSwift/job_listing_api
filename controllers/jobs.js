const jobsModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, NotFoundError } = require("../errors/index");
const getAlljobController = async (request, response) => {
  try {
    const alljobs = await jobsModel
      .find(
        { createdby: request.user.userID },
        { createdAt: 0, updatedAt: 0, __v: 0 }
      )
      .sort("createdAt");
    if (!alljobs) {
      return response.status(StatusCodes.OK).json({
        message: "No Jobs found",
      });
    }
    return response.status(StatusCodes.OK).json({
      alljobs,
      total: alljobs.length,
    });
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      error,
    });
  }
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
