const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();

const addRequestRouter = require("./features/addRequest/routes");

//Import the mongoose module
const mongoose = require("mongoose");
require("./models");

//Set up default mongoose connection
const mongoDB = `mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once("open", () => {
  console.log("MongoDB conected!");
});

// Import and run crons
require("./jobs/verifyRequestAndSaveResult");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", addRequestRouter);

module.exports = app;
