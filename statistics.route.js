const express = require('express');
const UAParser = require('ua-parser-js');
const map = require('lodash/fp/map');
const keys = require('lodash/fp/keys');
const pipe = require('lodash/fp/pipe');
const first = require('lodash/fp/first');
const unzip = require('lodash/fp/unzip');
const filter = require('lodash/fp/filter');
const reduce = require('lodash/fp/reduce');
const groupBy = require('lodash/fp/groupBy');
const flatten = require('lodash/fp/flatten');
const entries = require('lodash/fp/entries');
const mapKeys = require('lodash/fp/mapKeys');
const mapValues = require('lodash/fp/mapValues');
const formatWithOptions = require('date-fns/fp/formatWithOptions');
const fr = require('date-fns/locale/fr');

const Connection = require('./connection.model');

const reducer = (acc, cur) => {
  return acc + cur.count};

async function formatData(targetField) {
  const docs = await Connection.find({
    'fingerprint.key': targetField
  });

  return pipe(
    map(doc => doc.fingerprint.map(data => ({ ...data, count: doc.count }))),
    map(filter({ key: targetField })),
    flatten,
    groupBy('value'),
    mapValues((value) => reduce(reducer, 0, value)),
    entries,
    unzip
  )(docs);
}

const router = express.Router();

router.get('/os', async (req, res) => {
  const docs = await Connection.find({
  'fingerprint.key': 'userAgent'
});

  const data = pipe(
    map(doc => doc.fingerprint.map(data => ({ ...data, count: doc.count }))),
    map(filter({ key: 'userAgent' })),
    flatten,
    map(({ value, count }) => {
      const ua = new UAParser(value);
      return { count, value: ua.getOS().name }
    }),
    groupBy('value'),
    mapValues((value) => reduce(reducer, 0, value)),
    entries,
    unzip
  )(docs);

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
  const docs = await Connection.find({
    'fingerprint.key': 'userAgent'
  });

  const data = pipe(
    map(doc => doc.fingerprint.map(data => ({ ...data, count: doc.count }))),
    map(filter({ key: 'userAgent' })),
    flatten,
    map(({ value, count }) => {
      const ua = new UAParser(value);
      return { count, value: ua.getBrowser().name }
    }),
    groupBy('value'),
    mapValues((value) => reduce(reducer, 0, value)),
    entries,
    unzip
  )(docs);

  res.json({ data });
});

router.get('/connections', async (req, res) => {
  const data = await Connection.find(null, null, { sort: '-updatedAt', limit: 10 });

  res.json({ data });
});

router.get('/last-connection', async (req, res) => {
  const data = await Connection.find(null, null, { sort: '-updatedAt', limit: 1 });

  res.json(data);
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
    mapValues((value) => reduce(reducer, 0, value)),
    entries,
    unzip
  )(docs);

  res.json({ data });
});

module.exports = router;
