const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../Banco de Dados/models/db');
const PostEvent = require('../../../Banco de Dados/models/PostEvent');

exports.inicial = (req, res) => {
    let estaLogado = "Acesse sua conta";
    if (req.user){
        estaLogado = " Bem vindo " + req.user.nome;
    }
    res.render('inicial', {
        logadoounao: estaLogado,
    });
}

exports.eventos = (req, res) => {
    

    let estaLogado = "Acesse sua conta";
    const { tipo } = req.body;
    console.log(req.body.tipo);
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

    
  




    // let estaLogado = "Acesse sua conta";
    // if (req.user){
    //     estaLogado = " Bem vindo " + req.user.nome;
    // }
    // res.render('eventos', {
    //     logadoounao: estaLogado,
    // });
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

