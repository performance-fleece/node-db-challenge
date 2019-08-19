const express = require('express');

const router = express.Router();

const Project = require('./projectDb.js');

// USE /api/projects

//GET RESOURCES
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

//Get Resource by ID

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.getById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'There was an error finding that Project ID' });
  }
});

// ADD RESOURCE

router.post('/', async (req, res) => {
  try {
    const project = await Project.insert(req.body);
    res.status(201).json(resource);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'there was an error adding project' });
  }
});

module.exports = router;
