const db = require('../models/db');

const Event = db.sequelize.define('eventos',{
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
    }
});

//forçar criação de tabela ----
//Event.sync({force:true});
module.exports = Event;