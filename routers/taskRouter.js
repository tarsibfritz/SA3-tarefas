const Router = require("express").Router;
const router = Router();

// Métodos HTTP 
const taskController = require("../controllers/taskController");

// Rota GET para visualizar o formulário de criação de uma nova tarefa
router.get("/task/create", taskController.viewCreate);

// Rota POST para criar uma nova tarefa
router.post("/task", taskController.create);

// Rota GET para visualizar a lista de todas as tarefas
router.get("/", taskController.viewRead);

// Rota GET para listar todas as tarefas
router.get("/task", taskController.readList);

// Rota GET para ler uma tarefa
router.get("/task/:id", taskController.read);

// Rota GET para visualizar o formulário de atualização de uma tarefa
router.get("/task/update/:id", taskController.viewUpdate);

// Rota POST para atualizar uma tarefa
router.post("/task/:id", taskController.update);

// Rota GET para excluir uma tarefa
router.get("/task/delete/:id", taskController.delete);

// Rota DELETE para excluir uma tarefa
router.delete("/task/:id", taskController.delete);

// Exporta o roteador
module.exports = router;
