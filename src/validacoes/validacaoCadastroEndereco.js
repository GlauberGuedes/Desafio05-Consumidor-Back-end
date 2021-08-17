function validarEndereco(
    cep,
    endereco,
    complemento
) {
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
        return "O campo 'Endereço' é obrigatório."
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

module.exports = validarEndereco;