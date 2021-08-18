const knex = require('../conexao');
const validarPedido = require('../validacoes/validacaoRegistroPedido');

async function registrarPedido(req, res) {
    const { consumidor } = req;
    const { 
        subtotal, 
        taxa_de_entrega, 
        valor_total, 
        produto_id, 
        quantidade 
    } = req.body;

    let pedidoId;

    try {
        const erroValidacaoPedido = validarPedido(
            subtotal, 
            taxa_de_entrega, 
            valor_total, 
            produto_id, 
            quantidade 
        );

        if (erroValidacaoPedido) {
            return res.status(400).json(erroValidacaoPedido);
        } 

        const produtoExiste = await knex('produto').where({ id: produto_id }).first().returning('*');

        if (!produtoExiste) {
            return res.status(404).json("Produto não encontrado.");
        }
        
        const pedidoRegistrado = await knex('pedido').insert({
            consumidor_id: consumidor.id,
            restaurante_id: produtoExiste.restaurante_id,
            subtotal,
            taxa_de_entrega,
            valor_total
        }).returning('*');

        if (!pedidoRegistrado) {
            return res.status(400).json("Erro ao registrar o pedido.");
        }

        pedidoId = pedidoRegistrado[0].id;
        
        const itemDoPedidoRegistrado = await knex('itens_do_pedido').insert({
            pedido_id: pedidoId,
            produto_id,
            quantidade
        });

        if (!itemDoPedidoRegistrado) {
            return res.status(400).json("Erro ao registrar item.");
        }

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    registrarPedido
}