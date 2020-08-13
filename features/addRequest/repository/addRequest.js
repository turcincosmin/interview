const { Requests } = require("../../../models");

// Query function to add a new request
const addRequests = async (url) => {
  // Throw a new error if url param is missing
  if (!url) {
    throw new Error("URL param is missing");
  }
  try {
    const requestsLength = await Requests.countDocuments(); // Get latest requests count to increment id field

    // If everything is ok insert a new document to requests table
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
    // Throw a new error if the query fails
    throw new Error(error);
  }
};

module.exports = addRequests;
