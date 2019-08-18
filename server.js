const express = require('express');

const server = express();
server.use(logger);
server.use(express.json());

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} to ${req.path} at ${time.toISOString()}`);
}

module.exports = server;
