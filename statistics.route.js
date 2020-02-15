const express = require('express');

const Connection = require('./connections.route');

const reducer = (acc, cur) => acc + cur.count;

async function formatData(targetField) {
  const docs = await Connection.find({
    'fingerprint.key': targetField
  });

  return pipe(
    map('fingerprint'),
    map(filter({ key: targetField })),
    flatten,
    groupBy('value'),
    mapValues((value) => reduce(reducer, 0, value))
  )(docs);
}

const router = express.Router();

router.get('/systems', async (req, res) => {
  const data = await formatData('platform');

  res.json({ data });
});

router.get('/graphic-cards', async (req, res) => {
  const data = formatData('webglVendorAndRenderer');

  res.json({ data: keys(data) });
});

router.get('/timezones', async (req, res) => {
  const data = await formatData('timezone');

  res.json({ data });
});

router.get('/resolutions', async (req, res) => {
  const data = await formatData('availableScreenResolution');

  res.json({ data });
});

router.get('/memories', async (req, res) => {
  const data = await formatData('deviceMemory');

  res.json({ data });
});

router.get('/hardware-concurrency', async (req, res) => {
  const data = await formatData('hardwareConcurrency');

  res.json({ data });
});

router.get('/languages', async (req, res) => {
  const data = await formatData('language');

  res.json({ data });
});

router.get('/user-agents', async (req, res) => {
  const data = await formatData('userAgent');

  res.json({ data });
});

router.get('/users-stat', async (req, res) => {
  const docs = await Connection.find();

  const data = pipe(groupBy('id'), mapValues('count'))(docs);

  res.json({ data });
});

router.get('/monthly', async (req, res) => {
  const docs = await Connection.find({}, null, { sort: '-updatedAt' });

  const dateFormat = formatWithOptions({ locale: fr }, 'MMMM yyyy');

  const data = pipe(
    map((doc) => ({
      ...doc.toJSON(),
      updatedAt: dateFormat(doc.updatedAt),
      createdAt: dateFormat(doc.createdAt)
    })),
    groupBy('updatedAt'),
    mapValues((value) => reduce(reducer, 0, value))
  )(docs);

  res.json({ data });
});

module.exports = router;
