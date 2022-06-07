const PostEvent = require("../../main/database/migrations/PostEvent");
const uploadImage = require("../../presentation/middlewares/uploadimage");

exports.criarevento = (req, res) => {
  res.render("criarEvento", { logadoounao: " Bem vindo " + req.user.nome });
};

exports.editareventos = (req, res) => {
  PostEvent.findAll({
    where: {
      id: req.params.id,
    },
    raw: true,
  }).then(function (evento) {
    res.render("editarEvento", {
      evento: evento,
      logadoounao: " Bem vindo " + req.user.nome,
    });
  });
};

exports.meuseventos = function (req, res) {
  PostEvent.findAll({
    where: {
      usuario_id: req.user.id,
    },
    raw: true,
  }).then(function (eventos) {
    res.render("meusEventos", {
      eventos: eventos,
      logadoounao: " Bem vindo " + req.user.nome,
    });
  });
};

exports.cadastroeventoMutterMiddleware = uploadImage.fields([
  { name: "imagemcapa", maxCount: 1 },
  { name: "imagens", maxCount: 3 },
]);

exports.cadastroevento = function (req, res) {
  const { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao } =
    req.body;

  // ======================= junção do endereço (INICIO) =======================
  let endereco = rua + " " + numerorua + ",  " + bairro + ",   " + cidade;
  // ======================= junção do endereço (FINAL) =======================

  PostEvent.create({
    name: nome,
    numero: numero,
    tipodeevento: tipo,
    endereco: endereco,
    enderecoimagens: "./public/imagensUser",
    descricao: descricao,
    usuario_id: req.user.id,
  });
  res.redirect("/meusEv");
};

exports.editouEvento = async (req, res) => {
  let { nome, numero, tipo, endereco, descricao } = req.body;

  await PostEvent.update(
    {
      name: nome,
      numero: numero,
      tipodeevento: tipo,
      endereco: endereco,
      descricao: descricao,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(function () {
    res.redirect("/meusEv");
  });
};

exports.deletaEvento = async (req, res) => {
  await PostEvent.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/meusEv");
};
