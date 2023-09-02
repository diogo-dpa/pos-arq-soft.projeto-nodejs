const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(morgan("common"));
app.use(helmet());

const apiV1Router = require("./routes/apiV1Router");
app.use("/api/v1", apiV1Router);

app.listen(3000, function () {
	console.log("Servidor rodando na porta 3000");
});
