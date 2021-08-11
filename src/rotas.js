const express = require('express');
const rotas = express();
const consumidor = require("./controladores/consumidor");
const login = require('./controladores/login');
const verificarToken = require('./filtros/verificarToken');

rotas.post('/consumidor', consumidor.cadastrarConsumidor);
rotas.post('/login', login.loginConsumidor);

rotas.use(verificarToken);

module.exports = rotas;