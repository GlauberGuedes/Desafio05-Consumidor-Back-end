const knex = require('../conexao');

async function listarRestaurantes(req, res) {
    try {
        const restaurantes = await knex('restaurante');

        if (restaurantes.length === 0) {
            return res.status(400).json("Nenhum restaurante encontrado.");
        }

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterRestaurante(req, res) {
    const { id } = req.params;

    try {
        const restaurante = await knex('restaurante').where({ id }).first();

        if (!restaurante) {
            return res.status(400).json("Nenhum restaurante encontrado.");
        }

        return res.status(200).json(restaurante);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { 
    listarRestaurantes,
    obterRestaurante
};