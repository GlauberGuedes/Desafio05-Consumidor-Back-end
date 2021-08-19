const express = require('express');
const rotas = express();
const consumidor = require("./controladores/consumidor");
const login = require('./controladores/login');
const verificarToken = require('./filtros/verificarToken');
const restaurantes = require('./controladores/restaurantes');
const produtos = require('./controladores/produtos');
const pedidos = require('./controladores/pedidos');

rotas.post('/consumidor', consumidor.cadastrarConsumidor);
rotas.post('/login', login.loginConsumidor);

rotas.use(verificarToken);

rotas.get('/restaurantes', restaurantes.listarRestaurantes);
rotas.get('/restaurantes/:id', restaurantes.obterRestaurante);
rotas.get('/restaurantes/:id/produtos', produtos.listarProdutos);
rotas.get('/consumidor', consumidor.obterConsumidor);
rotas.post('/endereco', consumidor.cadastrarEndereco);
rotas.post('/pedidos', pedidos.registrarPedido);
rotas.post('/dados-pedido', pedidos.dadosPedido);


module.exports = rotas;