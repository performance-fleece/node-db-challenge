const express = require('express');

const router = express.Router();

const Resource = require('./resourceDb.js');

// USE /api/resources

//GET RESOURCES
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.get();
    res.status(200).json(resources);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: 'There was an error retrieving all Resources' });
  }
});

//Get Resource by ID

router.get('/:id', validateResourceId, async (req, res) => {
  res.status(200).json(req.resource);
});

// ADD RESOURCE

router.post('/', async (req, res) => {
  try {
    const resource = await Resource.insert(req.body);
    res.status(201).json(resource);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'there was an error adding resource' });
  }
});

async function validateResourceId(req, res, next) {
  try {
    const { id } = req.params;
    const resource = await Resource.getById(id);
    if (resource) {
      req.resource = resource;
      next();
    } else {
      res.status(404).json({ message: 'Resource not found ' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to process request' });
  }
}

module.exports = router;
