exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', tbl => {
    tbl.increments();

    tbl
      .string('resource_name')
      .notNullable()
      .unique();
    tbl.string('notes');
    tbl.boolean;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('resources');
};
