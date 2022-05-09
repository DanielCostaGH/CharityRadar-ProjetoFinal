const express = require('express');
const app = express();
const User = require('./Banco de Dados/models/db');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const postu = require('./Banco de Dados/models/PostUser');
const poste = require('./Banco de Dados/models/PostEvent');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('./control/auth')(passport);

//session para acessar os cookies
app.use(session({
    secret: 'teste',
    resave: true,
    saveUninitialized: true
}))
//--------

//passport para auth do login
app.use(passport.initialize());
app.use(passport.session());
//--------

//flash para mensagens
app.use(flash());
//--------

//middlewares para acessar msg
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.erro_msg = req.flash('error_msg');
    next();
})
//-------

//config handle : buscar html pages
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//--------

//Body - parser : pegar dados 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//--------

//adicionar imagens e css
app.use(express.static('public'));
//--------

//Paginas ----- rotas 
app.get('/', (req, res) => {
    res.render('inicial');

});

app.get('/falha', (req, res) => {
    res.send('falhou');
});
app.get('/logado', (req, res) => {
    res.render('inicial')
});
app.post("/cadastroU", async (req, res) => {
//---------------

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
            
            postu.create({
                name: nome,
                email: email,
                senha: hash,
            })
            .then(() => {
                console.log(" Post criado com sucesso ");
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
   
});
    //--------

app.post('/logar',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/falha',
        failuredFlash: true
    })(req,res,next);
})





app.listen(3333, () => {
    console.log("Servidor iniciado na Porta 3333: http://localhost:3333");
})