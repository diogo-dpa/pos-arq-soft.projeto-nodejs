/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("produtos").del();
	await knex("produtos").insert([
		{ id: 5, descricao: "Nescau 400gr", valor: 8.0, marca: "Nestlé" },
		{ id: 2, descricao: "Maionese 250gr", valor: 7.2, marca: "Helmans" },
		{ id: 3, descricao: "Iogurte Natural 200ml", valor: 2.5, marca: "Itambé" },
		{
			id: 1,
			descricao: "Arroz parboilizado 5Kg",
			valor: 25.0,
			marca: "Tio João",
		},
		{
			id: 4,
			descricao: "Batata Maior Palha 300gr",
			valor: 15.2,
			marca: "Chipps",
		},
	]);
};
