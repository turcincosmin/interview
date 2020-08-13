//Require Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Requests table structure and types
const RequestsSchema = new Schema({
  id: Number,
  url: String,
  roles: Array,
  status: String,
  http_code: Number,
  created_at: Date,
  updated_at: Date,
});

const Requests = mongoose.model("requests", RequestsSchema);

module.exports = {
  Requests,
};
