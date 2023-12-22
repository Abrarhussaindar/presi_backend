const mongoose = require('mongoose');
const Club = require('./Club');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  poster: {
    type: [String],
    nullable: true,

  },
  eventDate: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  clubName: {
    type: String,
    required: true,
  }

},
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
