const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('usuarios',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
});


//Cria uma tabela caso nao exista uma
//User.sync();


//Verificar se ha alguma alteração na tabela, e realiza a ateração
//User.sync({alter:true})


module.exports = User;