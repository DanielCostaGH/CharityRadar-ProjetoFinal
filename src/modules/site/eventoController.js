const bcrypt = require('bcryptjs');
const PostEvent = require('../../../Banco de Dados/models/PostEvent');
const uploadImage = require('../../middlewares/uploadimage');
const PostUser = require('../../../Banco de Dados/models/PostUser');
const User = require('../../../Banco de Dados/models/db');



exports.criarevento = (req, res) => {
    res.render('criarEvento',{logadoounao : " Bem vindo " + req.user.nome});
    
}


exports.editareventos = (req, res) => {
    res.render('editarEvento',{logadoounao : " Bem vindo " + req.user.nome});
    
}

exports.meuseventos = (req, res) => {
    res.render('meusEventos',{logadoounao : " Bem vindo " + req.user.nome});
    
}



exports.cadastroeventoMutterMiddleware = uploadImage.fields([
    { name: "imagemcapa", maxCount: 1 },
    { name: "imagens", maxCount: 3 }
]);

exports.cadastroevento = function (req, res) {
    const { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao} = req.body;
    console.log(req.body);
    
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
    })
    res.send('/');
};

// exports.editouEvento = async(req, res) => {
//     let feito;
//     const {nome,senha} = req .body;
 
//      //criação de hash
//      try{
//          await PostUser.update({ name: nome , senha: hash }, {
//              where: {
//                 id : req.user.id
//              }
         
//              }).then(function(){
//                  res.render('editarCadastro',{
//                      logadoounao : " Cadastro editado com sucesso "});
//              }).catch(function(erro){
//                  res.render('editarCadastro',{});
//              })
//      }
//          catch(err){
//              req.flash("error_msg"," Houve um erro durante a o salvamento do usuário ");
//              res.redirect("/");
//      }
         
//  }


