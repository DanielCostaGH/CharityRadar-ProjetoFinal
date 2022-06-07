const { Router } = require("express");
const controller = require("../presentation/controllers/controller");
const eventoController = require("../presentation/controllers/eventoController");
const userController = require("../presentation/controllers/userController");

const SiteRoutes = Router();

SiteRoutes.get("/", controller.inicial);
SiteRoutes.get("/listaEventos", controller.listaEventos);
SiteRoutes.post("/eventos", controller.eventos);
SiteRoutes.get("/faq", controller.faq);

//----- eventos routes---------
SiteRoutes.post(
  "/cadastroevento",
  eventoController.cadastroeventoMutterMiddleware,
  eventoController.cadastroevento
);
SiteRoutes.get("/criarEv", eventoController.criarevento);
SiteRoutes.get("/meusEv", eventoController.meuseventos);
SiteRoutes.get("/editarEv/:id", eventoController.editareventos);
SiteRoutes.post("/editouEvento/:id", eventoController.editouEvento);
SiteRoutes.get("/deletaEvento/:id", eventoController.deletaEvento);
//---------------------------------------------------

//----- user(login,cadastro) routes---------
SiteRoutes.post("/cadastrar", userController.cadastrar);
SiteRoutes.post("/logar", userController.logar);
SiteRoutes.get("/deslogar", userController.deslogar);
SiteRoutes.post("/editouCadastro", userController.editouCadastro);
SiteRoutes.get("/deletaCadastro", userController.deletaCadastro);
//---------------------------

module.exports = SiteRoutes;
