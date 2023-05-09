const mongoose = require("mongoose");
const { Schema } = mongoose;

const statsSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now,
  },

  totalPoints: {
    type: Number,
    min: 0,
  },

  rebounds: {
    type: Number,
    min: 0,
  },

  assists: {
    type: Number,
    min: 0,
  },

  steals: {
    type: Number,
    min: 0,
  },

  turnovers: {
    type: Number,
    min: 0,
  },

  fouls: {
    type: Number,
    min: 0,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  sport: {
    type: Schema.Types.ObjectId,
    ref: "Sport",
  },
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
