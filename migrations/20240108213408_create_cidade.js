/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema
        .createTable('cidades', function (table) {
            table.increments('id').primary();
            table.string('nome').notNullable();
            table.string('uf').notNullable();
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('cidades')
}
