const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  keeper: {
    type: Array,
    required: true,
  }, 
  score: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const scoreModel = mongoose.model('Keeper', ScoreSchema);

module.exports = scoreModel;
