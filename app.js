const express = require('express');
const app = express();
const User = require('./Banco de Dados/models/db');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const PostEvent = require('./Banco de Dados/models/PostEvent');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./control/auth')(passport);
const uploadImage = require('./src/middlewares/uploadimage');
const SiteRoutes = require('./src/modules/site/routes');

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

app.post("/cadastroevento",uploadImage.fields([
    { name: "imagemcapa", maxCount: 1 },
    { name: "imagens", maxCount: 3 }]),
    function (req, res) {
   const { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao} = req.body;
   
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
res.send('opa');

 });

app.use(SiteRoutes);

//Paginas ----- rotas -------- final

app.listen(3333, () => {
    console.log("Servidor iniciado na Porta 3333: http://localhost:3333");
})