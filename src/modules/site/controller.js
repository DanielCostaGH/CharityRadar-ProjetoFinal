const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../Banco de Dados/models/db');
const PostUser = require("../../../Banco de Dados/models/PostUser");
const multer = require('multer');


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

exports.criarevento = (req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('criarEvento', {
        logadoounao: estaLogado,
    });
}


exports.editareventos = (req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('editarEvento', {
        logadoounao: estaLogado,
    });
}

exports.editarCadastro =(req, res) => {
    let estaLogado;
    if (req.user){
        var saudacoes = " Bem vindo " + req.user.nome;
        estaLogado = saudacoes;
    }
    else {
        estaLogado = "Acesse sua conta";
    }
    res.render('editarCadastro', {
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

//==============================================================================logins e cadastros


exports.logar = (req,res,next) => {

    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/falha',
        failuredFlash: true
    })(req,res,next);

}

exports.cadastrar = async (req, res) => {
    // validação e cadastro
    const { nome, email, senha, senhaC } = req.body;

    var erros = [];
    if (!nome  || !email  || !senha  || !senhaC ) {
        erros.push({ texto: ' Preencha todos os campos ' });

    }
    if (senha != senhaC){
        erros.push({ texto: ' As senhas não batem' });
    }
    if (erros.length > 0) {
        res.render('inicial', { erros: erros })
    }
    else {
        //criação de hash
        try{
            const salt = bcrypt.genSaltSync(6);
            const hash = bcrypt.hashSync(req.body.senha);
            // cadastro----
            PostUser.create({
                name: nome,
                email: email,
                senha: hash,
            })
            .then(() => {
                console.log(" Post criado com sucesso ")
                res.render('inicial', {success_msg: 'Cadastro criado com sucesso'});
            }).catch((erro) => {
                req.flash('error_msg','Houve um erro , tente novamente ');
                console.log(" Houve um erro: " + erro);
            });
            
        }
        catch(err){
            req.flash("error_msg"," Houve um erro durante a o salvamento do usuário ");
            res.redirect("/");
        }
    }
    //cadastro ---------
}

