// Importa o módulo 'mysql' para interagir com um banco de dados MySQL
const mysql = require("mysql");

// Cria uma conexão com o banco de dados MySQL utilizando as configurações especificadas
const sqlConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "db_task",
});

// Exporta a conexão criada para que possa ser utilizada em outros arquivos do projeto
module.exports = sqlConnection;