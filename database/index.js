import knex from "knex";

const sqlite = knex({
    client: 'sqlite3',
    connection: {
        filename: "./database/data.sqlite"
    }
});

export default sqlite
