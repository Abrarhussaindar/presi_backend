const mongoose = require('mongoose');
const Club = require('./Club');

const EventReviewSchema = new mongoose.Schema({
  eventId: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
  }

},
  { timestamps: true }
);

module.exports = mongoose.model("EventReview", EventReviewSchema);
