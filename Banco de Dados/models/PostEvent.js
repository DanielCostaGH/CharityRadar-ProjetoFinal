const db = require('../models/db');
const PostUser = require("../models/PostUser");

const Event = db.sequelize.define('eventos',{
    name:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    numero:{
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    tipodeevento:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    endereco:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    enderecoimagens:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: db.Sequelize.STRING,
        allowNull: false,
    },

});

Event.belongsTo(PostUser,{
    constraint:true,
    foreignkey:"usuario_id"
});

PostUser.hasMany(Event,{
    foreignKey:"usuario_id"
});

//forçar criação de tabela ----
//Event.sync({force:true});
module.exports = Event;