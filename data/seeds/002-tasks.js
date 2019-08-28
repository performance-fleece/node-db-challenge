exports.seed = function(knex) {
  // Deletes ALL existing entries

  return knex('tasks')
    .truncate()
    .then(function() {
      return knex('tasks').insert([
        {
          id: 1,
          description: 'Task1 First Task',
          notes: '',
          project_id: 1,
          completed: false
        },
        {
          id: 2,
          description: 'Task1 Second Task',
          notes: 'second task description',
          project_id: 1,
          completed: false
        },
        {
          id: 3,
          description: 'Task 2 First Task',
          notes: '',
          project_id: 2,
          completed: false
        },
        {
          id: 4,
          description: 'Task 2 Second Task',
          notes: 'Second Task notes',
          project_id: 2,
          completed: false
        },
        {
          id: 5,
          description: 'Task 2 Third Task',
          notes: '',
          project_id: 2,
          completed: false
        }
      ]);
    });
};
