const express = require('express');
const app = express();
const User = require('./models/User')

app.use(express.json());


app.get("/", async (req, res) =>{
    res.send("Pagina Inicial");
});

app.post("/cadastro", async (req, res) =>{
    //console.log(req.body);

    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO Usuario não cadastrado com sucesso"
        })
    })
    
    //res.send("Pagina de Cadastro");
});

app.listen(3333, () => {
    console.log("Servidor iniciado na Porta 3333: http://localhost:3333");
})