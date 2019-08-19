const express = require('express');

const router = express.Router();

const Project = require('./projectDb.js');

// USE /api/projects

//GET Projects
router.get('/', async (req, res) => {
  const convertedArray = [];
  try {
    const projects = await Project.get();
    projects.map(project => {
      const converted = convertBoolean(project);
      convertedArray.push(converted);
    });

    res.status(200).json(convertedArray);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'There was an error retrieving all Projects' });
  }
});

//Get Projects by ID

router.get('/:id', validateProjectId, async (req, res) => {
  const converted = convertBoolean(req.project);
  res.status(200).json(converted);
});

// ADD Projects

router.post('/', async (req, res) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'there was an error adding project' });
  }
});

async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Project.getById(id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: 'Project not found ' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request' });
  }
}

function convertBoolean(project) {
  const { id, name, description } = project;
  const partial = { id, name, description };
  const true_complete = { ...partial, completed: true };
  const false_complete = { ...partial, completed: false };
  return project.completed == 1 ? true_complete : false_complete;
}

module.exports = router;
