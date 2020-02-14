const express = require('express');
const createError = require('http-errors');
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

const router = express.Router();

router.put('/:fingerprint', async (req, res) => {
  const { fingerprint: id } = req.params;
  const { fingerprint } = req.params;
  let data = Connection.findById(id);

  if (data) {
    await Connection.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { fingerprint });
  } else {
    data = await Connection.create({ fingerprint });
  }

  res.json(data.id);
});

module.exports = router;
