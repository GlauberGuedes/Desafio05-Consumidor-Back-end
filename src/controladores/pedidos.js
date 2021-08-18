const knex = require('../conexao');
const validarPedido = require('../validacoes/validacaoRegistroPedido');

async function registrarPedido(req, res) {
    const { consumidor } = req;
    const { 
        subtotal, 
        taxa_de_entrega, 
        valor_total, 
        produtos 
    } = req.body;

    let pedidoId;

    try {
        const erroValidacaoPedido = validarPedido(
            subtotal, 
            taxa_de_entrega, 
            valor_total, 
            produtos,
        );

        if (erroValidacaoPedido) {
            return res.status(400).json(erroValidacaoPedido);
        } 

        for(const produto of produtos) {
            const produtoAtivo = await knex('produto').where({id: produto.id}).first();

            if(!produtoAtivo.ativo) {
                return res.status(400).json(`O produto ${produtoAtivo.nome} não está mais ativo.`)
            }
        }

        const restaurante = await knex('restaurante').where({nome: produtos[0].nomeRestaurante}).first();

        if(restaurante.length === 0) {
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
                subtotal: produto.preco*produto.quantidade
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

module.exports = {
    registrarPedido
}