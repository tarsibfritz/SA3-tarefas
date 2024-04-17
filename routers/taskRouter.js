// Importa o módulo Router do framework Express
const Router = require("express").Router;

// Cria uma instância de um roteador do Express
// O roteador é usado para definir rotas e manipular requisições HTTP em uma aplicação Express
const router = Router();

// ----------------------------------------------------------------------------------------------
// Métodos HTTP para fazer as requisições
// ----------------------------------------------------------------------------------------------

// Importa o controlador de vagas de emprego
const taskController = require("../controllers/taskController");

// Define uma rota GET para visualizar o formulário de criação de uma nova vaga de emprego
router.get("/task/create", taskController.viewCreate);

// Define uma rota POST para criar uma nova vaga de emprego
// Quando uma solicitação POST é feita para "/job", o método create() do controlador de vagas de emprego é chamado
router.post("/task", taskController.create);

// Define uma rota GET para visualizar a lista de todas as vagas de emprego
router.get("/", taskController.viewRead);

// Define uma rota GET para listar todas as vagas de emprego
// Quando uma solicitação GET é feita para "/job", o método readList() do controlador de vagas de emprego é chamado
router.get("/task", taskController.readList);

// Define uma rota GET para ler uma vaga de emprego específica por ID
// Quando uma solicitação GET é feita para "/job/:id", o método read() do controlador de vagas de emprego é chamado,
// onde ":id" é um parâmetro na URL que representa o ID da vaga de emprego
router.get("/task/:id", taskController.read);

// Define uma rota GET para visualizar o formulário de atualização de uma vaga de emprego existente
router.get("/task/update/:id", taskController.viewUpdate);

// Define uma rota POST para atualizar uma vaga de emprego existente por ID
// Quando uma solicitação POST é feita para "/job/:id", o método update() do controlador de vagas de emprego é chamado,
// onde ":id" é um parâmetro na URL que representa o ID da vaga de emprego
router.post("/task/:id", taskController.update);

// Define uma rota GET para realizar a exclusão de uma vaga de emprego existente
router.get("/task/delete/:id", taskController.delete);

// Define uma rota DELETE para excluir uma vaga de emprego existente por ID
// Quando uma solicitação DELETE é feita para "/job/:id", o método delete() do controlador de vagas de emprego é chamado,
// onde ":id" é um parâmetro na URL que representa o ID da vaga de emprego
router.delete("/task/:id", taskController.delete);

// Exporta o objeto router (roteador)
// O roteador contém definições de rotas e controles para as diferentes solicitações HTTP.
module.exports = router;
