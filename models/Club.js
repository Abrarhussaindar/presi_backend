const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  image: {
    type: [String],
    nullable: true,
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Club", ClubSchema);
