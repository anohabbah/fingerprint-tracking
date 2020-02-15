
const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    fingerprint: { type: [Object], required: true },
    count: { type: Number, default: 1 }
  },
  { timestamps: true }
);
const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
