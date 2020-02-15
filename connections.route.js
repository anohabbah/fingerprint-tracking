const express = require('express');

const Connection = require('./connection.model');

const router = express.Router();

router.put('/:fingerprint', async (req, res) => {
  const { fingerprint: id } = req.params;
  const { fingerprint } = req.body;
  let data = await Connection.findById(id);

  if (data) {
    await Connection.updateOne({ _id: id }, { fingerprint, count: data.count + 1 });
    data = await Connection.findById(id);
  } else {
    data = await Connection.create({ _id: id, fingerprint });
  }

  res.json(data);
});

module.exports = router;
