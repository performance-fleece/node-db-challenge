exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function() {
      return knex('projects').insert([
        {
          id: 1,
          name: 'First test project no desc',
          description: '',
          completed: false
        },
        {
          id: 2,
          name: 'Second test project',
          description: 'This has a description',
          completed: false
        }
      ]);
    });
};
