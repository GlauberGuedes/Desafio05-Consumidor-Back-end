const knex = require("../conexao");
const validarConsumidor = require("../validacoes/validacaoCadastroConsumidor");
const bcrypt = require("bcrypt");

async function cadastrarConsumidor(req, res) {
  const { nome, email, telefone, senha } = req.body;

  try {
    const erroValidacaoConsumidor = validarConsumidor(
      nome,
      email,
      telefone,
      senha,
    );

    if (erroValidacaoConsumidor) {
      return res.status(400).json(erroValidacaoConsumidor);
    }

    const emailCadastrado = await knex("consumidor").where(
      "email",
      "ilike",
      email
    );

    if (emailCadastrado.length > 0) {
      return res.status(400).json("Este email já foi cadastrado.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const emailFormatado = email.toLowerCase();

    const consumidorCadastrado = await knex("consumidor")
      .insert({ nome, email: emailFormatado, telefone, senha: senhaCriptografada })
      .returning("*");

    if (consumidorCadastrado.length === 0) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res
      .status(200)
      .json("Consumidor cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function obterConsumidor(req, res) {
  const { consumidor } = req; 

  try {
    const enderecoConsumidor = await knex('endereco_consumidor')
      .join('consumidor', 'endereco_consumidor.consumidor_id', 'consumidor.id')
      .first();
    
    if (!enderecoConsumidor) {
      return res.status(400).json({ consumidor, endereco: "O usuário não possui nenhum endereço cadastrado no sistema."});
    }

    return res.status(200).json({ consumidor, endereco: enderecoConsumidor });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = { 
  cadastrarConsumidor,
  obterConsumidor
};