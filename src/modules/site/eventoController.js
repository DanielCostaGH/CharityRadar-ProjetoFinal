const bcrypt = require('bcryptjs');
const PostEvent = require('../../../Banco de Dados/models/PostEvent');
const uploadImage = require('../../middlewares/uploadimage');
const PostUser = require('../../../Banco de Dados/models/PostUser');
const User = require('../../../Banco de Dados/models/db');



exports.criarevento = (req, res) => {
    res.render('criarEvento', { logadoounao: " Bem vindo " + req.user.nome });

}


exports.editareventos = (req, res) => {
    req.body.id = req.params.id;
    res.render('editarEvento', { logadoounao: " Bem vindo " + req.user.nome });

}

exports.meuseventos = function (req, res) {

    PostEvent.findAll({
        where: {
            usuario_id: req.user.id
        },
        raw: true,
    }).then(function (eventos) {
        res.render('meusEventos', { eventos: eventos, logadoounao: " Bem vindo " + req.user.nome });

    });


}



exports.cadastroeventoMutterMiddleware = uploadImage.fields([
    { name: "imagemcapa", maxCount: 1 },
    { name: "imagens", maxCount: 3 }
]);

exports.cadastroevento = function (req, res) {

    const { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao } = req.body;

    // ======================= junção do endereço (INICIO) =======================
    const endereco = rua + " " + numerorua + ",  " + bairro + ",   " + cidade;
    // ======================= junção do endereço (FINAL) =======================

    PostEvent.create({
        name: nome,
        numero: numero,
        tipodeevento: tipo,
        endereco: endereco,
        enderecoimagens: './public/imagensUser',
        descricao: descricao,
        usuario_id: req.user.id
    });
    res.redirect('/meusEv')
};

exports.editouEvento = async (req, res) => {

    let { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao } = req.body;

    // ======================= junção do endereço (INICIO) =======================
    let endereco = rua + " " + numerorua + ",  " + bairro + ",   " + cidade;
    // ======================= junção do endereço (FINAL) =======================

    await PostEvent.update({
        name: nome,
        numero: numero,
        tipodeevento: tipo,
        endereco: endereco,
        descricao: descricao,
        },
        {
        where: {
            id: req.body.id 
        }

    }).then(function () {
        res.render('meusEventos', { logadoounao: " Bem vindo " + req.user.nome });
    });

}

exports.deletaEvento = async (req, res) => {
    await PostEvent.destroy({
        where: { 'id': req.params.id }
    });
    res.render('meusEventos',
        { logadoounao: " Bem vindo " + req.user.nome });

}

