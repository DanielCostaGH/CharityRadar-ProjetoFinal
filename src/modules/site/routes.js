const { Router } = require('express');
const controller = require("./controller");
const eventoController = require("./eventoController");
const userController = require("./userController");

const SiteRoutes = Router();


SiteRoutes.get('/',controller.inicial);
SiteRoutes.get('/eventos',controller.eventos);
SiteRoutes.get('/faq',controller.faq);

//----- eventos routes---------
SiteRoutes.post('/cadastroevento', eventoController.cadastroeventoMutterMiddleware, eventoController.cadastroevento);
SiteRoutes.get('/criarEv',eventoController.criarevento);
SiteRoutes.get('/meusEv',eventoController.meuseventos);
SiteRoutes.get('/editarEv',eventoController.editareventos);
// SiteRoutes.put('/editouEvento',eventoController.editouEvento);

//---------------------------------------------------

//----- user(login,cadastro) routes---------
SiteRoutes.post("/cadastrar", userController.cadastrar);
SiteRoutes.post("/logar", userController.logar);
SiteRoutes.get('/deslogar',userController.deslogar);
SiteRoutes.put('/editouCadastro',userController.editouCadastro);
SiteRoutes.delete('/deletaCadastro',userController.deletaCadastro);
//---------------------------

module.exports = SiteRoutes;