const { Requests } = require("../../../models");
const addRequests = async (url) => {
  if (!url) {
    throw new Error("URL param is missing");
  }
  try {
    const requestsLength = await Requests.countDocuments();
    const newRequest = Requests.collection.insertOne({
      url,
      id: requestsLength + 1,
      status: "NEW",
      http_code: null,
      updated_at: new Date(),
      created_at: new Date(),
    });
    return newRequest;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = addRequests;
