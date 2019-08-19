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

router.get('/:id/full', validateProjectId, async (req, res) => {
  try {
    const projects = convertBoolean(req.project);
    const orig_tasks = await Project.getTasks(req.params.id);
    const tasks = [];
    orig_tasks.map(task => {
      const converted = convertTask(task);
      tasks.push(converted);
    });
    // orig_tasks.map(task => {
    //   const converted = convertTask(task);
    //   convertedArray.push(converted);
    // });
    const resources = await Project.getResources(req.params.id);

    const joined = { ...projects, tasks, resources };
    res.status(200).json(joined);
  } catch (err) {
    res.status(500).json({
      error: 'There was an error retrieving the joined project information'
    });
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
  const { id, project_name, project_description } = project;
  const partial = { id, project_name, project_description };
  const true_complete = { ...partial, completed: true };
  const false_complete = { ...partial, completed: false };
  return project.completed == 1 ? true_complete : false_complete;
}

function convertTask(task) {
  const { id, description, notes } = task;
  const partial = { id, description, notes };
  const true_complete = { ...partial, completed: true };
  const false_complete = { ...partial, completed: false };
  return task.completed == 1 ? true_complete : false_complete;
}

module.exports = router;
