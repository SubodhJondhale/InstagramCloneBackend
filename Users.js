const mongoose = require("mongoose");
const Users = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: { type: String },
  file_name: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("users", Users);
