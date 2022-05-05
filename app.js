const express = require('express');
const app = express();
const User = require('./Banco de Dados/models/db');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const postu = require('./Banco de Dados/models/PostUser');
const poste = require('./Banco de Dados/models/PostEvent');
const session = require('express-session');
const flash = require('connect-flash');

//session e flash
app.use(session({
    secret: 'teste',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());
//--------

//middlewares
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

//Paginas ----- rotas 
app.get('/', (req, res) => {
    res.render('inicial');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post("/cadastroU", async (req, res) => {
//---------------

    //validação
    /*var erros = [];
    if (req.body.nome == null || req.body.email == null || req.body.password == null || req.body.telefone == null) {
        erros.push({ texto: ' Preencha todos os campos ' });

    }
    if (erros.length > 0) {
        res.render('inicial', { erros: erros })
    }
    else {*/
        postu.create({
            name: req.body.nome,
            email: req.body.email,
            password: req.body.senha,
            telefone: req.body.telefone

        }).then(function () {
            // res.flash('success_msg','Cadastro criado com sucesso')
            console.log(" Post criado com sucesso ");
        }).catch(function (erro) {
            //  req.flash('error_msg','Houve um erro , tente novamente ')
            console.log(" Houve um erro: " + erro);
        })
    //}
   
});
//--------




//adicionar imagens e css
app.use(express.static('public'));
//--------


app.listen(3333, () => {
    console.log("Servidor iniciado na Porta 3333: http://localhost:3333");
})