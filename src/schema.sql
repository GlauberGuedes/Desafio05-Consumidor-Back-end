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
  	rua TEXT NOT NULL,
  	complemento TEXT
);

CREATE TABLE pedido (
	id SERIAL NOT NULL PRIMARY KEY,
  	valor INTEGER NOT NULL,
  	consumidor_id INTEGER NOT NULL REFERENCES consumidor(id),
  	restaurante_id INTEGER NOT NULL REFERENCES restaurante(id)
);

CREATE TABLE itens_do_pedido (
	id SERIAL NOT NULL PRIMARY KEY,
  	pedido_id INTEGER NOT NULL REFERENCES pedido(id),
  	produto_id INTEGER NOT NULL REFERENCES produto(id),
  	quantidade INTEGER NOT NULL
);