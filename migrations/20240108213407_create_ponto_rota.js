/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema
        .createTable('pontos_rota', function (table) {
            table.increments('id').primary();
            table.integer('rota_id').notNullable();
            table.integer('ponto_id').notNullable();
            table.integer('posicao');
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('pontos_rota')
}
