// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/data.sqlite'
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './database/data.sqlite'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './database/data.sqlite'
    }
  }

};
