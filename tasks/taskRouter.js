const express = require('express');

const router = express.Router();

const Task = require('./taskDb.js');

///GET Tasks
router.get('/', async (req, res) => {
  const convertedArray = [];

  try {
    const tasks = await Task.get();
    tasks.map(task => {
      const converted = convertBoolean(task);
      convertedArray.push(converted);
    });
    res.status(200).json(convertedArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'There was an error retrieving all Tasks' });
  }
});

//Get Tasks by ID

router.get('/:id', validateTaskId, async (req, res) => {
  const converted = convertBoolean(req.task);
  res.status(200).json(converted);
});

// ADD Tasks

router.post('/', async (req, res) => {
  try {
    const task = await Task.insert(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'there was an error adding task' });
  }
});

async function validateTaskId(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.getById(id);
    if (task) {
      req.task = task;
      next();
    } else {
      res.status(404).json({ message: 'Task not found ' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request' });
  }
}

function convertBoolean(task) {
  const { id, description, notes } = task;
  const partial = { id, description, notes };
  const true_complete = { ...partial, completed: true };
  const false_complete = { ...partial, completed: false };
  if (task.completed == 1) {
    return true_complete;
  } else {
    return false_complete;
  }
}

module.exports = router;
