const express = require('express');
const rotas = express();
const consumidor = require("./controladores/consumidor");

rotas.post('/consumidor', consumidor.cadastrarConsumidor);

module.exports = rotas;