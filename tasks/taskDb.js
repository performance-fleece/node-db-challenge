const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert
};

function get() {
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select(
      't.id',
      'p.project_name',
      'p.project_description',
      't.description',
      't.notes',
      't.completed'
    );
}

function getById(id) {
  return db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select(
      't.id',
      'p.project_name',
      'p.project_description',
      't.description',
      't.notes',
      't.completed'
    )
    .where('t.id', id)
    .first();
}

function insert(task) {
  return db('tasks')
    .insert(task)
    .then(ids => {
      return getById(ids[0]);
    });
}
