const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../../Banco de Dados/models/db');
const PostUser = require("../../../Banco de Dados/models/PostUser");


exports.logar = (req,res,next) => {

    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/',
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

exports.deslogar = function(req, res){
    req.logout();
    res.redirect('/');
}


exports.editouCadastro = async(req, res) => {
    let feito;
    const {nome,senha} = req .body;
 
     //criação de hash
     try{
         const salt = bcrypt.genSaltSync(6);
         const hash = bcrypt.hashSync(req.body.senha);
 
         await PostUser.update({ name: nome , senha: hash }, {
             where: {
                id : req.user.id
             }
         
             }).then(function(){
                 res.render('editarCadastro',{
                     logadoounao : " Cadastro editado com sucesso "});
             }).catch(function(erro){
                 res.render('editarCadastro',{});
             })
     }
         catch(err){
             req.flash("error_msg"," Houve um erro durante a o salvamento do usuário ");
             res.redirect("/");
     }
         
 }


