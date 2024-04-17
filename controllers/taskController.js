// Importa o modelo de Job (vaga de emprego) para acessar as operações CRUD relacionadas a empregos
const taskModel = require("../models/taskModel");

// Define a classe JobController, responsável por controlar as operações relacionadas a empregos
class TaskController {

  // ADICIONADO
  // Método para visualizar a pagina inicial
  viewRead(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial"});
  }

  // Método para visualizar o formulário de criação de uma nova vaga de emprego
  viewCreate(req, res) {
    return res.status(200).render("./task/task_create", { title: "Adicionar Tarefa" });
  }

  // Método para visualizar o formulário de atualização de uma vaga de emprego existente
  viewUpdate(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função read() do modelo jobModel para obter a vaga de emprego com o ID fornecido
    const task = taskModel.read(id);
    return task
      .then((result) =>
        result.length == 0
          ? res.status(404).redirect("/")
          : res.status(200).render("./task/task_update", { title: "Atualizar Tarefa", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para listar todas as vagas de emprego
  readList(req, res) {
    // Chama a função readList() do modelo jobModel para obter a lista de vagas de emprego
    const tasksList = taskModel.readList();
    return tasksList
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
          : res.status(200).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para ler uma vaga de emprego específica por ID
  read(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função read() do modelo jobModel para obter a vaga de emprego com o ID fornecido
    const task = taskModel.read(id);
    return task
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
          : res.status(200).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para criar uma nova vaga de emprego
  create(req, res) {
    // Obtém os dados da nova vaga de emprego do corpo da requisição
    const newTask = req.body;
    // Chama a função create() do modelo jobModel para criar uma nova vaga de emprego
    const task = taskModel.create(newTask);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa criada com sucesso!'); window.location='/task' </script>"))
      .catch((error) => res.status(400).send(error.message));    
  }

  // Método para atualizar uma vaga de emprego existente por ID
  update(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Obtém os dados atualizados da vaga de emprego do corpo da requisição
    const updatedTask = req.body;
    // Chama a função update() do modelo jobModel para atualizar a vaga de emprego com o ID fornecido
    const task = taskModel.update(updatedTask, id);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa atualizada com sucesso!'); window.location='../../task' </script>"))
      .catch((error) => res.status(400).send(error.message));   
  }

  // Método para excluir uma vaga de emprego existente por ID
  delete(req, res) {
    // Obtém o parâmetro ID da requisição
    const { id } = req.params;
    // Chama a função delete() do modelo jobModel para excluir a vaga de emprego com o ID fornecido
    const task = taskModel.delete(id);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa excluída com sucesso!'); window.location='../../task' </script>"))
      .catch((error) => res.status(400).send(error.message));  
  }
}

// Exporta uma instância da classe JobController para ser utilizada em outros arquivos do projeto
module.exports = new TaskController();
