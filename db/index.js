const dbConnection = require("./dbConnection");

const db = require("./dbCreate");

// Exporta uma função que será executada para inicializar o banco de dados e as tabelas
module.exports = () => {
  db.initConnection(dbConnection);
};
