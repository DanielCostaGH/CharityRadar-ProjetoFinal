const { Router } = require('express');
const controller = require("./controller");


const SiteRoutes = Router();

SiteRoutes.post("/cadastrar", controller.cadastrar);
SiteRoutes.post("/logar", controller.logar);
SiteRoutes.get('/',controller.inicial);
SiteRoutes.get('/eventos',controller.eventos);
SiteRoutes.get('/criarEv',controller.criarevento);
SiteRoutes.get('/editarEv',controller.editareventos);
SiteRoutes.get('/editarC',controller.editarCadastro);
SiteRoutes.get('/faq',controller.faq);

module.exports = SiteRoutes;