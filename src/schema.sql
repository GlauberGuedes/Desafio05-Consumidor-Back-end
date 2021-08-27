CREATE TABLE consumidor (
	id SERIAL NOT NULL PRIMARY KEY,
  	nome VARCHAR(100) NOT NULL,
  	email VARCHAR(100) NOT NULL,
  	telefone BIGINT NOT NULL, 
  	senha TEXT NOT NULL
);

CREATE TABLE endereco_consumidor (
	id SERIAL NOT NULL PRIMARY KEY,
  	consumidor_id INTEGER NOT NULL REFERENCES consumidor(id),
  	cep BIGINT NOT NULL,
  	endereco TEXT NOT NULL,
  	complemento TEXT
);

CREATE TABLE pedido (
	id SERIAL NOT NULL PRIMARY KEY,
  	consumidor_id INTEGER NOT NULL REFERENCES consumidor(id),
  	restaurante_id INTEGER NOT NULL REFERENCES restaurante(id),
	subtotal INTEGER NOT NULL,
  	taxa_de_entrega INTEGER NOT NULL DEFAULT 0,
	valor_total INTEGER NOT NULL,
	saiu_para_entrega BOOLEAN DEFAULT false,
	entregue BOOLEAN DEFAULT false
);

CREATE TABLE itens_do_pedido (
	id SERIAL NOT NULL PRIMARY KEY,
  	pedido_id INTEGER NOT NULL REFERENCES pedido(id),
  	produto_id INTEGER NOT NULL REFERENCES produto(id),
  	quantidade INTEGER NOT NULL,
		preco INTEGER NOT NULL,
		subtotal INTEGER NOT NULL
);