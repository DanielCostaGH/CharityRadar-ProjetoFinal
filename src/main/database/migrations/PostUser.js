const db = require("../db");
const User = db.sequelize.define("usuarios", {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

//forçar criação de tabela -----
//User.sync({force:true});
module.exports = User;
