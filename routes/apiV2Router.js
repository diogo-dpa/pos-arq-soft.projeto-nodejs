const express = require("express");
const apiV2Router = express.Router();
const knex = require("knex")(
	require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

apiV2Router.use(express.json());

//---------------------------------------------- API
apiV2Router.get("/produtos", (_, res) => {
	knex("produtos")
		.then((produtos) => {
			res.status(200).json(produtos);
		})
		.catch((err) => {
			res.status(500).json({
				message: `Erro ao recuperar produtos do database: ${err.message}`,
			});
		});
});

apiV2Router.get("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});
	knex("produtos")
		.where({ id })
		.then((produtos) => {
			if (produtos.length) {
				res.status(200).json(produtos[0]);
			} else {
				res.status(404).json({
					message: "Produto não encontrado",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: `Erro ao buscar produto na database: ${err.message}`,
			});
		});
});

apiV2Router.post("/produtos", (req, res) => {
	const { descricao, valor, marca } = req.body;

	if (!descricao || !valor || !marca)
		res.status(500).json({
			message: "Atributos inválidos",
		});

	knex("produtos")
		.insert({
			descricao,
			valor,
			marca,
		})
		.then((produto) => {
			console.log({ produto });
			res.status(200).json({
				message: "Criado com sucesso",
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: `Erro ao inserir produto na database: ${err.message}`,
			});
		});
});

apiV2Router.put("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});

	const { descricao, valor, marca } = req.body;

	if (!descricao || !valor || !marca)
		res.status(400).json({
			message: "Atributos inválidos",
		});

	knex("produtos")
		.where({ id })
		.update({
			descricao,
			marca,
			valor,
		})
		.then((produto) => {
			if (produto) {
				res.status(200).json("Produto atualizado com sucesso");
			} else {
				res.status(404).json({
					message: "Produto não encontrado",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: `Erro ao atualizar produto na database: ${err.message}`,
			});
		});
});

apiV2Router.delete("/produtos/:id", (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id))
		res.status(500).json({
			error: "Invalid id",
		});

	knex("produtos")
		.where({ id })
		.del()
		.then((produto) => {
			console.log({ produto });
			if (produto) {
				res.status(200).json("Produto deletado com sucesso");
			} else {
				res.status(404).json({
					message: "Produto não encontrado",
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: `Erro ao deletar produto na database: ${err.message}`,
			});
		});
});

module.exports = apiV2Router;
