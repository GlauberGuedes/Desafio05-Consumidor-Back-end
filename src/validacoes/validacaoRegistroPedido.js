function validarPedido(
    subtotal, 
    taxa_de_entrega, 
    valor_total, 
    produtos
) {
    if(produtos.length === 0) {
        return "O produto deve ser informado.";
    }
    
    for(const produto of produtos) {
        if(!produto.id) {
            return "O produto deve ser informado.";
        }
        if(!produto.quantidade) {
            return "A quantidade do produto deve ser informada.";
        }
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