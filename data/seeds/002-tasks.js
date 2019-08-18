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
          task_id: 1
        },
        {
          id: 2,
          description: 'Task1 Second Task',
          notes: 'second task description',
          task_id: 1
        },
        {
          id: 3,
          description: 'Task 2 First Task',
          notes: '',
          task_id: 2
        },
        {
          id: 4,
          description: 'Task 2 Second Task',
          notes: 'Second Task notes',
          task_id: 2
        },
        {
          id: 5,
          description: 'Task 2 Third Task',
          notes: '',
          task_id: 2
        }
      ]);
    });
};
