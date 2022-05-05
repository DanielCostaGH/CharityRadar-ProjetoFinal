const Sequelize = require('sequelize');

const sequelize = new Sequelize("teste","root","123456789",{
    host: 'localhost',
    dialect: 'mysql'
});


sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com SUCESSO")
}).catch(function(erro){
    console.log("Erro de conexão :" + erro)
})

module.exports = {
    sequelize :sequelize,
    Sequelize : Sequelize
}
//module.exports = sequelize;