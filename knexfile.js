// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/project-database.db3'
    },
    userNullAsDefault: true
  }
};
