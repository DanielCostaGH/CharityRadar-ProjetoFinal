const db = require('../models/db');

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
    }
});

//forçar criação de tabela ----
Event.sync({force:true});
module.exports = Event;