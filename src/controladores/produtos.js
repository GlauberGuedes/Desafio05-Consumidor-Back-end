const knex = require('../conexao');

async function listarProdutos(req, res) {
    const { id } = req.params;

    try {
        const produtos = await knex('produto').where({ restaurante_id: id });

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { 
    listarProdutos 
};