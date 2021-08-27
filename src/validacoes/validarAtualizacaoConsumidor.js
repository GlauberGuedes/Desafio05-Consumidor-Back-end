function validarAtualizacaoConsumidor(
  nome,
  email,
  telefone,
  senha,
  endereco,
  cep,
  complemento
) {
  if (!nome) {
    return "O campo 'nome' é obrigatório.";
  }
  if (typeof nome !== "string") {
    return "O campo 'nome' precisa ser preenchido com um texto.";
  }
  if (!nome.trim()) {
    return "O campo 'nome' é obrigatório";
  }
  if (nome.length > 100) {
    return "O campo 'nome' deve conter, no máximo, 100 caracteres.";
  }
  if (!email) {
    return "O campo 'email' é obrigatório.";
  }
  if (typeof email !== "string") {
    return "O campo 'email' precisa ser preenchido com um texto.";
  }
  if (!email.trim()) {
    return "O campo 'email' é obrigatório.";
  }
  if (email.length > 100) {
    return "O campo 'email' deve conter, no máximo, 100 caracteres.";
  }
  if (!email.includes("@")) {
    return "O campo 'email' está incorreto.";
  }
  const indice = email.indexOf("@");
  if (!email.includes(".", indice)) {
    return "O campo 'email' está incorreto.";
  }
  if (!telefone) {
    return "O campo 'telefone' é obrigatório.";
  }
  if (!Number(telefone)) {
    return "O campo 'telefone' tem que ser um número.";
  }
  if (String(telefone).includes(".")) {
    return "O campo 'telefone' tem que ser um número válido.";
  }
  if (telefone.length < 10 || telefone.length > 12) {
    return "O campo 'telefone' tem que ser um número válido.";
  }
  if (senha) {
    if (typeof senha !== "string") {
      return "O campo 'senha' precisa ser preenchido com um texto.";
    }
    if (!senha.trim()) {
      return "O campo 'senha' é obrigatório.";
    }
    if (senha.length < 6) {
      return "O campo 'senha' deve conter, no mínimo, 6 caracteres.";
    }
  }
  if (!cep) {
    return "O campo 'CEP' é obrigatório.";
  }
  if (!Number(cep)) {
    return "O CEP deve ser preenchido apenas com números.";
  }
  if (String(cep).includes(".")) {
    return "Insira um CEP válido.";
  }
  if (cep.length < 8 || cep.length > 8) {
    return "O CEP deve ser composto por 8 dígitos.";
  }
  if (!endereco) {
    return "O campo 'Endereço' é obrigatório.";
  }
  if (typeof endereco !== "string") {
    return "O campo 'Endereço' deve ser preenchido com um texto.";
  }
  if (!endereco.trim()) {
    return "O campo 'Endereço' é obrigatório";
  }
  if (complemento) {
    if (typeof complemento !== "string") {
      return "O campo 'Complemento' deve ser preenchido com um texto.";
    }
  }
}

module.exports = validarAtualizacaoConsumidor;
