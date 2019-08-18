exports.up = function(knex, Promise) {
  return knex.schema.createTable('project_resources', tbl => {
    tbl
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .referecnes('id')
      .inTable('resources');
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources');
    tbl.primary(['resource_id', 'project_id']);
  });
};

exports.down = function(knex, Promise) {};