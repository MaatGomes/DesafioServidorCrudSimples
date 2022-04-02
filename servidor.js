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
const bp = require('body-parser')

const app = express();

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Mostra todas as pessoas
app.get("/clientes", function(req, res) {
    res.json(clientesArray);
});

//Mostra uma pessoa em específico
app.get('/cliente/:id', function(req, res) {
    let clienteEcontrada = clientesArray.find(function (item){
        return item.id === parseInt(req.params.id);
    });

    res.json(clienteEcontrada);
});

app.post('/cliente/cadastrarnovocliente', function(req, res){
    let itemIds = clientesArray.map(item => item.id);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
   
    let newItem = {
        id: newId, 
        name: req.body.name
    };

    clientesArray.push(newItem); 

 res.json(newItem);

});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));