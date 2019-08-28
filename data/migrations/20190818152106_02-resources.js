exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', tbl => {
    tbl.increments();

    tbl
      .string('name')
      .notNullable()
      .unique();
    tbl.string('description');
    tbl.boolean;
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('resources');
};
