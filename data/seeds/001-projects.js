exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function() {
      return knex('projects').insert([
        {
          id: 1,
          project_name: 'First test project no desc',
          project_description: '',
          completed: false
        },
        {
          id: 2,
          project_name: 'Second test project',
          project_description: 'This has a description',
          completed: false
        }
      ]);
    });
};
