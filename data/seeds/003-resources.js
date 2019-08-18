exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('resources').insert([
        { id: 1, name: 'Samson', notes: 'friendly pug' },
        { id: 2, name: 'Delilah', notes: 'angry pug' },
        { id: 3, name: 'Laptop', notes: 'Mac' },
        { id: 4, name: 'Wooden Mallet', notes: '' }
      ]);
    });
};
