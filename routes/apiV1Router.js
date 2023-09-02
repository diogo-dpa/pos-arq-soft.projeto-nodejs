const express = require("express");
const database_mock = require("../database/database_mock");
const apiV1Router = express.Router();

apiV1Router.use(express.json());

//---------------------------------------------- API
apiV1Router.get("/produtos", (_, res) => {
	res.status(200).json(database_mock.produtos);
});

apiV1Router.get("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});
	const idx = database_mock.produtos.findIndex((p) => p.id === id);

	if (idx === -1)
		res.status(500).json({
			error: "Product does not exist",
		});

	res.status(200).json(database_mock.produtos[idx]);
});

apiV1Router.post("/produtos", (req, res) => {
	const { descricao, valor, marca } = req.body;

	if (!descricao || !valor || !marca)
		res.status(500).send("Internal server error");

	const higherIdElement = database_mock.produtos.sort((a, b) => b.id - a.id)[0]
		.id;
	const newElement = {
		id: higherIdElement + 1,
		descricao,
		valor,
		marca,
	};
	database_mock.produtos = [...database_mock.produtos, newElement];
	res.status(200).json(newElement);
});

apiV1Router.put("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});

	const { descricao, valor, marca } = req.body;
	const choosenProductIndex = database_mock.produtos.findIndex(
		(p) => p.id === id
	);

	if (choosenProductIndex === -1)
		res.status(500).json({
			error: "Product does not exist",
		});

	database_mock.produtos[choosenProductIndex] = {
		...database_mock.produtos[choosenProductIndex],
		descricao:
			descricao ?? database_mock.produtos[choosenProductIndex].descricao,
		valor: valor ?? database_mock.produtos[choosenProductIndex].valor,
		marca: marca ?? database_mock.produtos[choosenProductIndex].marca,
	};

	res.status(200).json({ ...database_mock.produtos[choosenProductIndex] });
});

apiV1Router.delete("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});

	const choosenProductIndex = database_mock.produtos.findIndex(
		(p) => p.id === id
	);

	if (choosenProductIndex === -1)
		res.status(500).json({
			error: "Product does not exist",
		});

	database_mock.produtos.splice(choosenProductIndex, 1);

	res.status(200).send({
		message: "Deletado com sucesso",
	});
});

module.exports = apiV1Router;
