const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(morgan("common"));
app.use(helmet());

const apiV1Router = require("./routes/apiV1Router");
app.use("/", apiV1Router);

app.listen(process.env.PORT || 3000, function () {
	console.log("Servidor rodando na porta 3000");
});
