
class TaskDatabase {
  
  // Método para inicializar a conexão com o banco de dados e iniciar o processo de criação do banco e da tabela
  initConnection(connection) {
    this.connection = connection; // Armazena a conexão passada como argumento
    this.initDatabase(); // Chama o método para inicializar o banco de dados
  }

  // Método para inicializar o banco de dados
  initDatabase() {
    // Conecta ao banco de dados utilizando a conexão fornecida
    this.connection.connect((error) => {
      if (error) {
        console.log("Ocorreu um erro ao conectar no banco de dados..."); // Exibe uma mensagem de erro se a conexão falhar
        console.log(error.message); // Exibe o erro detalhado
        return;
      }
      console.log("Banco de dados conectado com sucesso..."); // Exibe uma mensagem de sucesso se a conexão for bem-sucedida
      this.createDatabase(); // Chama o método para criar o banco de dados
    });
  }

  // Método para criar o banco de dados
  createDatabase() {
    // Query SQL para criar o banco de dados, se ele não existir
    const sql = "CREATE DATABASE IF NOT EXISTS db_task";
    // Executa a query para criar o banco de dados
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar o banco de dados..."); // Exibe uma mensagem de erro se a criação do banco falhar
        console.log(error.message); // Exibe o erro detalhado
        return;
      }
      console.log("Banco de dados criado com sucesso..."); // Exibe uma mensagem de sucesso se a criação do banco for bem-sucedida
      // Seleciona o banco de dados recém-criado para utilização
      this.connection.query("USE db_task", (error) => {
        if (error) {
          console.log("Ocorreu um erro ao selecionar o banco de dados..."); // Exibe uma mensagem de erro se a seleção do banco falhar
          console.log(error.message); // Exibe o erro detalhado
          return;
        }
        console.log("Banco de dados selecionado com sucesso..."); // Exibe uma mensagem de sucesso se a seleção do banco for bem-sucedida
        this.createTable(); // Chama o método para criar a tabela após criar o banco de dados
      });
    });
  }

  // Método para criar a tabela 'job'
  createTable() {
    // Query SQL para criar a tabela 'job', se ela não existir
    const sql = `
        CREATE TABLE IF NOT EXISTS task (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          descricao VARCHAR(100),
          status ENUM('Não iniciada', 'Em progresso', 'Finalizada') DEFAULT 'Não iniciada',
          data_inicio DATE,
          data_conclusao DATE NULL
        )
      `;
    // Executa a query para criar a tabela 'job'
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Ocorreu um erro ao criar a tabela task..."); // Exibe uma mensagem de erro se a criação da tabela falhar
        console.log(error.message); // Exibe o erro detalhado
        return;
      }
      console.log("Tabela task criada com sucesso..."); // Exibe uma mensagem de sucesso se a criação da tabela for bem-sucedida
    });
  }
}

// Exporta uma instância da classe JobDatabase para ser utilizada em outros arquivos do projeto
module.exports = new TaskDatabase();
