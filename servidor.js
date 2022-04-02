var clientesNames = ["Mateus", "Laura", "Gustavo", "Rebeca", "Letícia"];
var cliente = {};
var clientesArray = [];

for(let i = 0; i < clientesNames.length; i++){
    cliente.id = (i + 1);
    cliente.name = clientesNames[i];
    clientesArray.push({...cliente});
}

const http = require("http");
const express = require("express");
const bp = require('body-parser');
const e = require("express");

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Mostra todos os clientes
app.get("/clientes", function(req, res) {
    res.json(clientesArray);
});

//Mostra um cliente em específico
app.get('/cliente/:id', function(req, res) {
    let clienteEcontrada = clientesArray.find(function (item){
        return item.id === parseInt(req.params.id);
    });

    res.json(clienteEcontrada);
});

//Cadastra um cliente
app.post('/cliente/cadastrarnovocliente', function(req, res){
    let itemIds = clientesArray.map(item => item.id);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    let newcliente = {
        id: newId, 
        name: req.body.name
    };

    clientesArray.push(newcliente); 

 res.json(newcliente);

});

//Atualiza um cliente
app.put('/cliente/editarcliente/:id', function (req, res) {
   
    let clienteEncontrado = clientesArray.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (clienteEncontrado) {
        let clienteAtualizado = {
            id: clienteEncontrado.id,
            title: req.body.name,
        }; 

        let index = clientesArray.indexOf(clienteEncontrado);

        clientesArray.splice(index, 1, clienteAtualizado);

        res.json(clienteAtualizado);
    } else {
        res.sendStatus(404);
    }
});

//Deleta um cliente
app.delete('/cliente/deletarcliente/:id', function (req, res) {

    let clienteEcontrado = clientesArray.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (clienteEcontrado) {

        let index = clientesArray.indexOf(clienteEcontrado);

        clientesArray.splice(index, 1);
    }

    res.json(clienteEcontrado);
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));