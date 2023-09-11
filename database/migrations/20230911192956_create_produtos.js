/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("produtos", (table) => {
		table.increments("id");
		table.string("descricao", 100).notNullable();
		table.decimal("valor", 10, 2).notNullable();
		table.string("marca", 100).notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("produtos");
};
