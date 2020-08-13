const express = require("express");
const router = express.Router();
const addRequest = require("./repository/addRequest");

// Endpoint to add a new request
router.post("/add-request", async (req, res) => {
  const { url } = req.body;
  try {
    await addRequest(url);
    res.json({
      success: true,
      message: "Successfully added a new request entry",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
