require('express-async-errors');
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('debug')('fingerprint:server');
const winston = require('winston');
const helmet = require('helmet');
const apiCallLogger = require('morgan');

const transports = [new winston.transports.Console()];
const debug = winston.createLogger({
  level: 'error',
  format: winston.format.prettyPrint(),
  transports,
  exceptionHandlers: transports
});

process.on('unhandledRejection', (e) => {
  throw e;
});

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-qstql.mongodb.net/test?retryWrites=true&w=majority`;
mongoose
  .connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => logger('DB Connected!'))
  .catch((e) => {
    throw createError(500, e)
  });

const connectionsRouter = require('./connections.route');
const statisticsRouter = require('./statistics.route');

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/dist/'));
app.use(apiCallLogger('dev'));
app.use(helmet());

app.use('/api/connections', connectionsRouter);
app.use('/api/statistics', statisticsRouter);

app.use((req, res, next) => {
  next(new createError.NotFound())
});

app.use((err, req, res, next) => {
  debug.error(err.message, err);

  res.sendStatus(err.statusCode || 500);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger(`Server listing at http://localhost:${port}`)
});
