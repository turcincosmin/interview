const cron = require("node-cron");
const axios = require("axios");
const { Requests: RequestsModel } = require("../models/index");

// Function to verify each request url and save the result
const verifyRequest = async () => {
  // Step 1 set request as PROCESSING and fetch id, to run each request once
  let requestDetails;
  try {
    requestDetails = await RequestsModel.collection.findOneAndUpdate(
      { status: "NEW" },
      { $set: { status: "PROCESSING" } }
    );
  } catch (error) {
    console.log(error);
  }

  // Fetch id and url from the PROCCESING request to update status
  const { id, url } = requestDetails.value || {};
  if (!id) {
    return;
  }
  console.log(`Request with id: ${id} is now in status PROCCESING`);
  try {
    // Step 2 request url field from the PROCCESING request to fetch the status
    const { status } = await axios.get(url || "");
    requestDetails = await RequestsModel.collection.updateOne(
      { id },
      { $set: { status: "DONE", http_code: status } }
    ); // Update request status and http_code if request was made width success
    console.log(`Request with id: ${id} is now in status DONE`);
  } catch (error) {
    requestDetails = await RequestsModel.collection.updateOne(
      { id },
      { $set: { status: "ERROR" } }
    ); // Update request status as ERROR if request failed
    console.log(`Request with id: ${id} ended with status ERROR`);
  }
};

// Run job function each second
cron.schedule("*/1 * * * * *", function () {
  verifyRequest();
});
