const dbConnection = require("../db/dbConnection");

// Define a classe TaskModel para manipular operações relacionadas às tarefas no banco de dados
class taskModel{

  // Método para executar consultas SQL no banco de dados
  executeSQL(sql, parameters = "") {
    return new Promise( function (resolve, reject) {
          dbConnection.query(sql, parameters, function (error, resposta) {
          if (error) {
            return reject(error);
          }
          return resolve(resposta);
        });
      }
    );
  }

  // Método para obter a lista de todas as tarefas no banco de dados
  readList() {
    const sql = "SELECT id, descricao, status, data_inicio, data_conclusao FROM task";
    return this.executeSQL(sql); 
  }

  // Método para obter uma tarefa específica por ID no banco de dados
  read(id) {
    const sql = "SELECT id, descricao, status, data_inicio, data_conclusao FROM task WHERE id = ?";
    return this.executeSQL(sql, id);
  }

  // Método para criar uma nova tarefa no banco de dados
  create(newTask) {
    const sql = "INSERT INTO task (descricao, status, data_inicio, data_conclusao) VALUES (?, ?, ?, ?)";
    const values = [newTask.descricao, newTask.status, newTask.data_inicio, newTask.data_conclusao];
    return this.executeSQL(sql, values);
  }

  // Método para atualizar uma tarefa existente por ID no banco de dados
  update(updatedTask, id) {
    const sql = "UPDATE task SET descricao = ?, status = ?, data_inicio = ?, data_conclusao = ? WHERE id = ?";
    const values = [updatedTask.descricao, updatedTask.status, updatedTask.data_inicio, updatedTask.data_conclusao, id]; 
    return this.executeSQL(sql, values); 
  }

  // Método para excluir uma tarefa existente por ID no banco de dados
  delete(id) {
    const sql = "DELETE FROM task WHERE id = ?";
    return this.executeSQL(sql, id);
  }
}

// Exporta uma instância da classe taskModel para ser utilizada em outros arquivos do projeto
module.exports = new taskModel();
