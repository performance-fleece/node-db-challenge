exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .string('project_name', 128)
        .notNullable()
        .unique();
      tbl.string('description', 255);
      tbl.boolean('completed');
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description').notNullable();
      tbl.string('notes');
      tbl
        .integer('task_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tasks').dropTableIfExists('projects');
};
