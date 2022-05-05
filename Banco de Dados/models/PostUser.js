const db = require('../models/db');

const User = db.sequelize.define('usuarios',{
   /* id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },*/
    name:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    telefone:{
        type: db.Sequelize.STRING,
        allowNull: false,
    }
});

//forçar criação de tabela -----
//User.sync({force:true});
module.exports = User;