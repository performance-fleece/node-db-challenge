exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('resources').insert([
        { id: 1, name: 'Samson', description: 'friendly pug' },
        { id: 2, name: 'Delilah', description: 'angry pug' },
        { id: 3, name: 'Laptop', description: 'Mac' },
        { id: 4, name: 'Wooden Mallet', description: '' }
      ]);
    });
};
