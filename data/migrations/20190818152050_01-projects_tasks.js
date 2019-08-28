exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .string('project_name', 128)
        .notNullable()
        .unique();
      tbl.string('project_description', 255);
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(0);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description').notNullable();
      tbl.string('notes');
      tbl
        .boolean('completed')
        .notNullable()
        .defaultTo(0);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tasks').dropTableIfExists('projects');
};
