const mongoose = require("mongoose");
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;
