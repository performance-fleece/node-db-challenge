const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert
};

function get() {
  return db('tasks');
}

function getById(id) {
  return db('tasks')
    .where({ id })
    .first();
}

function insert(task) {
  return db('tasks')
    .insert(task)
    .then(ids => {
      return getById(ids[0]);
    });
}
