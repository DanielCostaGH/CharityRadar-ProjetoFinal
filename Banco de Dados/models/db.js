const Sequelize = require('sequelize');

const sequelize = new Sequelize("mydb","root","root",{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com SUCESSO")
}).catch(function(){
    console.log("Erro conexão com o banco de dados nao realizada")
})

module.exports = sequelize;