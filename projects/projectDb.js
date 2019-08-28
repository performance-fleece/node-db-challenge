const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  getTasks,
  getResources
};

function get() {
  return db('projects');
}

function getById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(ids => {
      return getById(ids[0]);
    });
}

function getTasks(id) {
  return db('tasks as t')
    .select('t.id', 't.description', 't.notes', 't.completed')
    .where('t.project_id', id);
}

function getResources(id) {
  return db('project_resources as pr')
    .join('resources as r', 'pr.resource_id', 'r.id')
    .select('r.id', 'r.name', 'r.description')
    .where('pr.project_id', id);
}
