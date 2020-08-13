const cron = require("node-cron");
const axios = require("axios");
const { Requests: RequestsModel } = require("../models/index");

const verifyRequest = async () => {
  let requestDetails;
  try {
    requestDetails = await RequestsModel.collection.findOneAndUpdate(
      { status: "NEW" },
      { $set: { status: "PROCESSING" } }
    );
  } catch (error) {
    console.log(error);
  }
  const { id, url } = requestDetails.value || {};
  console.log(id, url);

  try {
    const { status } = await axios.get(url || "");
    requestDetails = await RequestsModel.collection.updateOne(
      { id },
      { $set: { status: "DONE", http_code: status } }
    );
  } catch (error) {
    requestDetails = await RequestsModel.collection.updateOne(
      { id },
      { $set: { status: "ERROR" } }
    );
  }
};

cron.schedule("*/1 * * * * *", function () {
  verifyRequest();
});
