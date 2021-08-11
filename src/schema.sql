CREATE TABLE consumidor (
	id serial NOT NULL PRIMARY KEY,
  	nome varchar(100) NOT NULL,
  	email varchar(100) NOT NULL,
  	telefone bigint not null, 
  	senha text NOT NULL
);