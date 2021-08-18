function validarPedido(
    subtotal, 
    taxa_de_entrega, 
    valor_total, 
    produto_id, 
    quantidade 
) {
    if (!produto_id) {
        return "O ID do produto deve ser informado.";
    }

    if (!Number(produto_id)) {
        return "O ID do produto deve ser preenchido com um número.";
    }

    if (!quantidade) {
        return "A quantidade do item deve ser informada.";
    }

    if (!Number(quantidade)) {
        return "A quantidade deve ser preenchida com um número.";
    }

    if (!subtotal) {
        return "O subtotal deve ser informado.";
    }

    if (!Number(subtotal)) {
        return "O subtotal deve ser preenchido com um número.";
    }

    if (!taxa_de_entrega) {
        return "A taxa de entrega deve ser informada.";
    }

    if (!Number(taxa_de_entrega)) {
        return "A taxa de entrega deve ser preenchida com um número.";
    }

    if (!valor_total) {
        return "O valor total deve ser informado.";
    }

    if (!Number(valor_total)) {
        return "O valor total deve ser preenchido com um número.";
    }
}

module.exports = validarPedido;