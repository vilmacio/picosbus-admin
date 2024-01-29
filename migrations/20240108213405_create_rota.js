/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema
        .createTable('rotas', function (table) {
            table.increments('id').primary();
            table.integer('cidade_id').notNullable();
            table.integer('origem_ponto_id').notNullable();
            table.integer('destino_ponto_id').notNullable();
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('rotas')
}
