exports.up = function(knex, Promise) {
  return knex.schema.createTable('project_resources', tbl => {
    tbl
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.primary(['resource_id', 'project_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('project_resources');
};
