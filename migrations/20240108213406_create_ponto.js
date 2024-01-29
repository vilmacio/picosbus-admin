/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema
        .createTable('pontos', function (table) {
            table.increments('id').primary();
            table.integer('cidade_id').notNullable();
            table.string('bairro');
            table.string('logradouro');
            table.string('descricao');
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('pontos')
}
