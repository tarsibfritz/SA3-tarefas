class TaskDatabase {
  
  // Método para inicializar a conexão com o banco de dados e iniciar o processo de criação do banco e da tabela
  initConnection(connection) {
    this.connection = connection;
    this.initDatabase();
  }

  // Método para inicializar o banco de dados
  initDatabase() {
    // Conecta ao banco de dados utilizando a conexão fornecida
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados...");
        console.log(error.message);
        return;
      }
      console.log("Banco de dados conectado com sucesso...");
      this.createDatabase();
    });
  }

  // Método para criar o banco de dados
  createDatabase() {
    // Query SQL para criar o banco de dados, se ele não existir
    const sql = "CREATE DATABASE IF NOT EXISTS db_task";
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados...");
        console.log(error.message);
        return;
      }
      console.log("Banco de dados criado com sucesso...");
      // Seleciona o banco de dados criado para utilização
      this.connection.query("USE db_task", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados...");
          console.log(error.message);
          return;
        }
        console.log("Banco de dados selecionado com sucesso...");
        this.createTable();
      });
    });
  }

  // Método para criar a tabela 'task'
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS task (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          descricao VARCHAR(100),
          status ENUM('Não iniciada', 'Em progresso', 'Finalizada') DEFAULT 'Não iniciada',
          data_inicio DATE,
          data_conclusao DATE NULL
        )
      `;
    // Executa a query para criar a tabela 'task'
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela task...");
        console.log(error.message);
        return;
      }
      console.log("Tabela task criada com sucesso...");
    });
  }
}

// Exporta uma instância da classe TaskDatabase para ser utilizada em outros arquivos do projeto
module.exports = new TaskDatabase();
