const jobsModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors/index");
const getAlljobController = async (request, response) => {
  try {
    const alljobs = await jobsModel
      .find(
        { createdby: request.user.userID },
        { createdAt: 0, updatedAt: 0, __v: 0 }
      )
      .sort("createdAt");
    if (!alljobs) {
      return response.status(StatusCodes.NOT_FOUND).json({
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
  const { userID } = request.user;
  const { id } = request.params;

  try {
    const findJob = await jobsModel.findOne({ _id: id, createdby: userID });
    if (!findJob) {
      throw new NotFoundError(`Jobs was not found with this id :${id}`);
    }
    return response.status(StatusCodes.OK).json({
      findJob,
    });
  } catch (error) {
    return response.status(StatusCodes.BAD_GATEWAY).json({
      error,
    });
  }
};

const addJobController = async (request, response) => {
  request.body.createdby = request.user.userID;
  try {
    const job = new jobsModel(request.body);
    await job.save();

    return response.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...error.message,
    });
  }
};

const deleteJobController = async (request, response) => {
  const { userID } = request.user;
  const { id } = request.params;
  try {
    const job = await jobsModel.findOneAndDelete({
      _id: id,
      createdby: userID,
    });
    if (!job) {
      throw new BadRequestError("Job you trying to delete doesnt exist");
    }
    await job.save();

    return response.status(StatusCodes.OK).json({
      status: "Success",
      deleted: job,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateJobController = async (request, response) => {
  const { userID } = request.user;
  const { id } = request.params;
  const { company, position } = request.body;

  if (!userID || !id) {
    throw new BadRequestError(
      "Please make sure you have logged in our selected the right jobs"
    );
  }

  if (!company || !position || company === "" || position === "") {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: "Please make sure that company /position is filled",
    });
  }

  try {
    const jobs = await jobsModel.findOne({ _id: id, createdby: userID });
    if (!jobs) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message: "Job not found",
      });
    }
    jobs.company = company;
    jobs.position = position;

    await jobs.save();

    return response.status(StatusCodes.OK).json({
      jobs,
    });
  } catch (error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error,
    });
  }
};

module.exports = {
  getAlljobController,
  getJobController,
  addJobController,
  deleteJobController,
  updateJobController,
};
