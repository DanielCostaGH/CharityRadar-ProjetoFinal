const PostEvent = require("../../main/database/migrations/PostEvent");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const fs = require("fs");

exports.criarevento = (req, res) => {
  res.render('criarEvento', { logadoounao: " Bem vindo " + req.user.nome });
}


exports.editareventos = (req, res) => {
  PostEvent.findAll({
      where: {
          id: req.params.id
      },
      raw: true,
  }).then(function (evento) {
      res.render('editarEvento', { evento: evento, logadoounao: " Bem vindo " + req.user.nome });

  });
}

exports.meuseventos = function (req, res) {

  PostEvent.findAll({
      where: {
          usuario_id: req.user.id
      },
      raw: true,
  }).then(function (eventos) {
      res.render('meusEventos', { eventos: eventos, logadoounao: " Bem vindo " + req.user.nome });

  });


}



exports.cadastroeventoMutterMiddleware = upload.fields([
  { name: "imagemcapa", maxCount: 1 },
  //{ name: "imagens", maxCount: 1 }
]);

exports.cadastroevento = async (req, res) => {

  const { nome, numero, tipo, rua, cidade, bairro, numerorua, descricao } = req.body;

 // ======================= junção do endereço (INICIO) =======================
 let endereco = rua + " " + numerorua + ",  " + bairro + ",   " + cidade;
 // ======================= junção do endereço (FINAL) =======================
  try{
    const eventoCriado = await PostEvent.create({
      name: nome,
      numero: numero,
      tipodeevento: tipo,
      endereco: endereco,
      enderecoimagens: "",
      descricao: descricao,
      usuario_id: req.user.id
    });
    const eventId = eventoCriado.getDataValue("id");
    const dirPath = `${__dirname}/../../../public/imgEventos/${eventId}`;
    

    fs.mkdirSync(dirPath);

    const capa = req.files['imagemcapa'][0];
    //const imagens = req.files['imagens'][0];
    const capaPath = `capa.${capa.originalname.split(".").pop()}`;
    // const imagensPath = `imagens.${imagens.originalname.split(".").pop()}`;

    fs.writeFileSync(`${dirPath}/${capaPath}`, capa.buffer);
    // fs.writeFileSync(`${dirPath}/${imagensPath}`, imagens.buffer);
    const pathimage = "/imgEventos/"+eventId+"/"+capaPath;
    await eventoCriado.update({enderecoimagens: pathimage});

    res.redirect('/meusEv');
  }
  catch(err){
    throw err;
  }
};

exports.editouEvento = async (req, res) => {

  let { nome, numero, tipo, endereco, descricao } = req.body;


  await PostEvent.update({
      name: nome,
      numero: numero,
      tipodeevento: tipo,
      endereco: endereco,
      descricao: descricao,
      },
      {
      where: {
          id: req.params.id
      }

  }).then(function () {
      res.redirect('/meusEv');
  });

}


exports.deletaEvento = async (req, res) => {
  await PostEvent.destroy({
      where: { 'id': req.params.id }
  });
  res.redirect('/meusEv');

}

