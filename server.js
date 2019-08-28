const express = require('express');

const resourceRouter = require('./resources/resourceRouter');
const taskRouter = require('./tasks/taskRouter');
const projectRouter = require('./projects/projectRouter');

const server = express();
server.use(logger);
server.use(express.json());

server.use('/api/resources', resourceRouter);
server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} to ${req.path} at ${time.toISOString()}`);
  next();
}

module.exports = server;
