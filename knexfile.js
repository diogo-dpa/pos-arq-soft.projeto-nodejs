// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./database/dev.sqlite3",
		},
		migrations: {
			directory: "./database/migrations",
			tableName: "knex_migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},

	production: {
		client: "pg",
		connection: {
			host: process.env.PGHOST || "",
			database: process.env.PGDATABASE || "my_db",
			user: process.env.PGUSER || "username",
			password: process.env.PGPASSWORD || "password",
			port: process.env.PGPORT || "",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./database/migrations",
			tableName: "knex_migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
