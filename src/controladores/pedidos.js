const knex = require('../conexao');
const validarPedido = require('../validacoes/validacaoRegistroPedido');

async function registrarPedido(req, res) {
    const { consumidor } = req;
    const { 
        subtotal, 
        taxa_de_entrega, 
        valor_total,
        restauranteId,
        produtos,
    } = req.body;

    let pedidoId;

    try {
        const erroValidacaoPedido = validarPedido(
            subtotal, 
            taxa_de_entrega,
            valor_total,
            restauranteId,
            produtos,
        );

        if (erroValidacaoPedido) {
            return res.status(400).json(erroValidacaoPedido);
        } 

        const enderecoConsumidor = await knex('endereco_consumidor').where({consumidor_id: consumidor.id}).first();

        if(!enderecoConsumidor) {
            return res.status(400).json("É necessário preencher o endeço.");
        }

        for(const produto of produtos) {
            const produtoAtivo = await knex('produto').where({id: produto.id}).first();

            if(!produtoAtivo.ativo) {
                return res.status(400).json(`O produto ${produtoAtivo.nome} não está mais ativo.`)
            }
        }

        const restaurante = await knex('restaurante').where({id: restauranteId}).first();

        if(!restaurante) {
            return res.status(400).json("Restaurante não encontrado.");
        }
        
        const pedidoRegistrado = await knex('pedido').insert({
            consumidor_id: consumidor.id,
            restaurante_id: restaurante.id,
            subtotal,
            taxa_de_entrega,
            valor_total
        }).returning('*');

        if (pedidoRegistrado.length === 0) {
            return res.status(400).json("Erro ao registrar o pedido.");
        }

        pedidoId = pedidoRegistrado[0].id;

        for(const produto of produtos) {

            const itemDoPedidoRegistrado = await knex('itens_do_pedido').insert({
                pedido_id: pedidoId,
                produto_id: produto.id,
                quantidade: produto.quantidade,
                preco: produto.preco,
                subtotal: produto.subtotal
            }).returning('*');

            if (itemDoPedidoRegistrado.length === 0) {
                return res.status(400).json("Erro ao registrar item.");
            }
        }

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function dadosPedido(req, res) {
    const carrinho  = req.body;

    const produtos = [];
    let subtotal = 0;
    try{
        const restaurante = await knex('restaurante').where({id: carrinho[0].idRestaurante}).first();

        if(!restaurante) {
            return res.status(400).json("Restaurante não encontrado.");
        }

        for(const produto of carrinho) {
            const produtoDoCarrinho = await knex('produto').where({id: produto.id }).first();

            if(!produtoDoCarrinho) {
                return res.status(400).json("Produto não encontrado.");
            }

            produtoDoCarrinho.quantidade = produto.quantidade;
            produtoDoCarrinho.subtotal = produto.quantidade * produtoDoCarrinho.preco;

            subtotal += produtoDoCarrinho.subtotal;
            produtos.push(produtoDoCarrinho);
        }

        return res.status(200).json({restaurante, produtos, subtotal, total: subtotal + restaurante.taxa_entrega});

    }catch(error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    registrarPedido,
    dadosPedido
}