import knex from "knex";

const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: "./data.sqlite"
    },
    debug: true
});

export default sqlite
