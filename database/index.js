const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "todo_db"
  }
});
// if your database has a username and password, you are going to need it here. 

module.exports = knex;
