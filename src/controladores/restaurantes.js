const knex = require('../conexao');

async function listarRestaurantes(req, res) {
    const categoria = req.query.categoria;
    
    try {
        const restaurantes = await knex('restaurante');

        if (restaurantes.length === 0) {
            return res.status(400).json("Nenhum restaurante encontrado.");
        }

        if (categoria) {
            const listaFiltrada = await knex('restaurante')
                .join('categoria', 'restaurante.categoria_id', 'categoria.id')
                .where('categoria.nome', 'ilike', categoria)
                .select('restaurante.*');
            
            return res.status(200).json(listaFiltrada)
        }

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterRestaurante(req, res) {
    const { id } = req.params;

    try {
        const restaurante = await knex('restaurante')
            .join('categoria', {'categoria.id': 'restaurante.categoria_id'})
            .select(
                'restaurante.*',
                'categoria.imagem as categoria_imagem'
            )
            .where('restaurante.id', id)
            .first();
        
        if (!restaurante) {
            return res.status(400).json("Nenhum restaurante encontrado.");
        }

        return res.status(200).json({ restaurante });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function listaDeCategoria(req, res) {
    try {
        const categorias = await knex("categoria");

        if (categorias.length === 0) {
            return res.status(400).json("Nenhuma categoria encontrada.");
        }

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { 
    listarRestaurantes,
    obterRestaurante,
    listaDeCategoria
};