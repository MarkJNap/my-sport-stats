const mongoose = require("mongoose");
const { Schema } = mongoose;

const statsSchema = new Schema({
  creationDate: {
    type: Date,
    default: Date.now,
  },

  // Basketball Stats
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

  // AFL Stats
  goals: {
    type: Number,
    min: 0,
  },
  behinds: {
    type: Number,
    min: 0,
  },
  disposals: {
    type: Number,
    min: 0,
  },
  tackles: {
    type: Number,
    min: 0,
  },
  marks: {
    type: Number,
    min: 0,
  },
  kicks: {
    type: Number,
    min: 0,
  },

  // Cricket Stats
  runs: {
    type: Number,
    min: 0,
  },
  ballsFaced: {
    type: Number,
    min: 0,
  },
  sixes: {
    type: Number,
    min: 0,
  },
  overs: {
    type: Number,
    min: 0,
  },
  wickets: {
    type: Number,
    min: 0,
  },
  runsGiven: {
    type: Number,
    min: 0,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  sports: {
    type: Schema.Types.ObjectId,
    ref: "Sports",
  },
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
