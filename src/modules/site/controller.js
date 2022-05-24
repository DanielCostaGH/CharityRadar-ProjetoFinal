const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../Banco de Dados/models/db');



exports.inicial = (req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('inicial', {
        logadoounao: estaLogado,
    });
}

exports.eventos = (req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('eventos', {
        logadoounao: estaLogado,
    });
}

exports.faq =(req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('faq', {
        logadoounao: estaLogado,
    });
}
