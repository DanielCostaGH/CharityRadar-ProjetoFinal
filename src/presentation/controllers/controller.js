const PostEvent = require("../../main/database/migrations/PostEvent");
const PostUser = require("../../main/database/migrations/PostUser");

exports.inicial = (req, res) => {
  let estaLogado = "Acesse sua conta";
  if (req.user){
      estaLogado = " Bem vindo " + req.user.nome;
  }
  res.render('inicial', {
      logadoounao: estaLogado,
  });
}

exports.modalEventos = (req, res) => {
  
  PostEvent.findAll({
      where: {
          id: req.params.id
      },
      raw: true,
  }).then(function (evento) {
      res.render('modalEventos', {evento: evento, layout: false});

  });
}


exports.listaEventos = (req, res) => {
  let estaLogado = "Acesse sua conta";
  if (req.user){
      estaLogado = " Bem vindo " + req.user.nome;
  }
  PostEvent.findAll({
      raw: true,
  }).then(function (eventos) {
      res.render('eventos', { eventos: eventos, logadoounao: estaLogado, });

  });

}

exports.eventos = (req, res) => {
  

  let estaLogado = "Acesse sua conta";
  const { tipo } = req.body;
    let tipos = tipo;
  
  if (req.user){
      estaLogado = " Bem vindo " + req.user.nome;
  }
  if (tipos != 'todos'){
      PostEvent.findAll({
          where:{
              tipodeevento: tipos
          },
          raw: true,
      }).then(function (eventos) {
          res.render('eventos', { eventos: eventos, logadoounao: estaLogado, });
  
      });
  }else {
      PostEvent.findAll({
          raw: true,
      }).then(function (eventos) {
          res.render('eventos', { eventos: eventos, logadoounao: estaLogado, });
  
      });
  }

}


exports.faq =(req, res) => {
  let estaLogado = "Acesse sua conta";
  if (req.user){
      estaLogado = " Bem vindo " + req.user.nome;
  }
  res.render('faq', {
      logadoounao: estaLogado,
  });
}