const { Router } = require('express');
const controller = require("./controller");
const eventoController = require("./eventoController");
const userController = require("./userController");

const SiteRoutes = Router();


SiteRoutes.get('/',controller.inicial);
SiteRoutes.get('/eventos',controller.eventos);
SiteRoutes.get('/faq',controller.faq);

//----- insertion,editions and delete routes---------
SiteRoutes.post('/cadastroevento', eventoController.cadastroeventoMutterMiddleware, eventoController.cadastroevento);
SiteRoutes.get('/criarEv',eventoController.criarevento);
SiteRoutes.get('/meusEv',eventoController.meuseventos);
SiteRoutes.get('/editarEv',eventoController.editareventos);
// SiteRoutes.post('/editouEvento',eventoController.editouEvento);
SiteRoutes.get('/editarC',userController.editarCadastro);
SiteRoutes.post('/editouCadastro',userController.editouCadastro);
// SiteRoutes.post('/deletaCadastro',userController.deletacadastro);
//---------------------------------------------------


//----- login routes---------
SiteRoutes.post("/cadastrar", userController.cadastrar);
SiteRoutes.post("/logar", userController.logar);
SiteRoutes.get('/deslogar',userController.deslogar);
//---------------------------

module.exports = SiteRoutes;