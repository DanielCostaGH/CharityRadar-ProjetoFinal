const multer = require("multer");

// Function que sera utilizada para o save de imagens (para cadastro de eventos)
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/imagensUser");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString + "_" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceito) => formatoAceito == file.mimetype
    );
    if (extensaoImg) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
