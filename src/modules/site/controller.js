const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../Banco de Dados/models/db');


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
    if (req.user){
        estaLogado = " Bem vindo " + req.user.nome;
    }
    res.render('eventos', {
        logadoounao: estaLogado,
    });
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

