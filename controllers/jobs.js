const getAlljobController = async (request, response) => {
  return response.json({
    user: request.user,
  });
};

const getJobController = async (request, response) => {
  return response.send("get a signle job ");
};

const addJobController = async (request, response) => {
  return response.send("add one job");
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
