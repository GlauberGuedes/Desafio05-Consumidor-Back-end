const knex = require('../conexao');

async function listarRestaurantes(req, res) {
    try {
        const restaurantes = await knex('restaurante');

        if (restaurantes.length === 0) {
            return res.status(400).json('Nenhum restaurante encontrado.');
        }

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function listarProdutos(req, res) {
    const { id } = req.params;

    try {
        const produtos = await knex('produto').where({ restaurante_id: id });

        if (produtos.length === 0) {
            return res.status(400).json('Não há produtos cadastrados neste restaurante.');
        }

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { 
    listarRestaurantes,
    listarProdutos 
};