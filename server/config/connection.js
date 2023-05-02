const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/project-3"
);

module.exports = mongoose.connection;
