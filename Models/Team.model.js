const mongoose = require('mongoose')
const Schema = mongoose.Schema


const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  img_url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Team = new mongoose.model("Teams", teamSchema);
module.exports = Team;
