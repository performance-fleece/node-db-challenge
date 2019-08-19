const express = require('express');

const router = express.Router();

const Project = require('./projectDb.js');

// USE /api/projects

//GET Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'There was an error retrieving all Projects' });
  }
});

//Get Projects by ID

router.get('/:id', validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
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

module.exports = router;
