const knex = require('../conexao');
const bcrypt = require('bcrypt');
const validarLogin = require('../validacoes/validacaoLoginConsumidor');
const jwt = require('jsonwebtoken');

async function loginConsumidor(req, res) {
  const { email, senha } = req.body;

  try {
    const erroValidacaoLogin = validarLogin(email, senha);

    if (erroValidacaoLogin) {
      return res.status(400).json(erroValidacaoLogin);
    }

    const consumidor = await knex('consumidor')
      .where('email', 'ilike', email)
      .first();

    if (!consumidor) {
      return res.status(404).json('Usuário não encontrado.');
    }

    const senhaCorreta = await bcrypt.compare(senha, consumidor.senha);

    if (!senhaCorreta) {
      return res.status(400).json('Email ou senha incorretos.');
    }

    const token = jwt.sign({ id: consumidor.id }, process.env.SENHA_HASH);

    const { senha: _, ...dadosConsumidor } = consumidor;

    return res.status(200).json({ consumidor: dadosConsumidor, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { loginConsumidor };