const routerTasks = require("./taskRouter.js");

// Exporta uma função que recebe dois parâmetros: 'app' (instância do Express) e 'express' (módulo Express)
module.exports = function (app, express) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routerTasks);
};