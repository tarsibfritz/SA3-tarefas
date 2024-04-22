// Importa o modelo de Task (tarefa) para acessar as operações CRUD relacionadas a tarefas
const taskModel = require("../models/taskModel");

// Define a classe TaskController, responsável por controlar as operações relacionadas a tarefas
class TaskController {

  // ADICIONADO COM O VIEWS
  // Método para visualizar a pagina inicial
  viewRead(req, res) {
    return res.status(200).render("./index", { title: "Página Inicial"});
  }

  // Método para visualizar o formulário de criação de uma nova tarefa
  viewCreate(req, res) {
    return res.status(200).render("./task/task_create", { title: "Adicionar Tarefa" });
  }

  // Método para visualizar o formulário de atualização de uma tarefa existente
  viewUpdate(req, res) {
    const { id } = req.params;
    const task = taskModel.read(id);
    return task
      .then((result) =>
        result.length == 0
          ? res.status(404).redirect("/")
          : res.status(200).render("./task/task_update", { title: "Atualizar Tarefa", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para listar todas as tarefas
  readList(req, res) {
    const tasksList = taskModel.readList();
    return tasksList
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
          : res.status(200).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para ler uma tarefa específica por ID
  read(req, res) {
    const { id } = req.params;
    const task = taskModel.read(id);
    return task
      .then((result) =>
        result.length == 0
          ? res.status(404).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
          : res.status(200).render("./task/task_read", { title: "Lista de Tarefas", tasks: result })
      )
      .catch((error) => res.status(400).send(error.message));  
  }

  // Método para criar uma tarefa
  create(req, res) {
    // Obtém os dados da nova tarefa do corpo da requisição
    const { descricao, status, data_inicio, data_conclusao } = req.body;

    // Verificar se a data de conclusão foi informada
    const dataConclusao = data_conclusao ? data_conclusao : null;

    // Criar uma nova tarefa
    const newTask = {
      descricao: descricao,
      status: status,
      data_inicio: data_inicio,
      data_conclusao: dataConclusao
    };

    // Chama a função create() do modelo taskModel para criar uma nova tarefa
    const task = taskModel.create(newTask);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa criada com sucesso!'); window.location='/task' </script>"))
      .catch((error) => res.status(400).send(error.message));    
  }

  // Método para atualizar uma tarefa existente por ID
  update(req, res) {
    const { id } = req.params;
    // Obtém os dados da nova tarefa do corpo da requisição
    const { descricao, status, data_inicio, data_conclusao } = req.body;

    // Verificar se a data de conclusão foi informada
    const dataConclusao = data_conclusao ? data_conclusao : null;

      // Criar um objeto com os dados atualizados
    const updatedTask = {
      descricao: descricao,
      status: status,
      data_inicio: data_inicio,
      data_conclusao: dataConclusao
    };

    // Chama a função update() do modelo taskModel para atualizar uma tarefa
    const task = taskModel.update(updatedTask, id);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa atualizada com sucesso!'); window.location='../../task' </script>"))
      .catch((error) => res.status(400).send(error.message));   
  }

  // Método para excluir uma tarefa existente por ID
  delete(req, res) {
    const { id } = req.params;
    const task = taskModel.delete(id);
    return task
      .then((result) => res.status(200).send("<script> alert('Tarefa excluída com sucesso!'); window.location='../../task' </script>"))
      .catch((error) => res.status(400).send(error.message));  
  }
}

// Exporta uma instância da classe TaskController para ser utilizada em outros arquivos do projeto
module.exports = new TaskController();