const mongoose = require("mongoose");
const { Schema } = mongoose;

const sportSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Sports = mongoose.model("Sports", sportSchema);

module.exports = Sports;
