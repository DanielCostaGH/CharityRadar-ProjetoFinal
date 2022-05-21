const multer = require ('multer');

// Function que sera utilizada para o save de imagens (para cadastro de eventos)
module.exports=(eventName,multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, './public/imagensSalvas')
        },
        filename: (req,file,cb) =>{
            cb(null,Date.now().toString + "_" + file.originalname + eventName )
        }
    }),
    fileFilter: (req,file,cb)=>{
        const extensaoImg = ['image/png','image/jpg','image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);
        if(extensaoImg){
            return cb(null,true);
        }
        return cb(null,false);
    }
  
}));
