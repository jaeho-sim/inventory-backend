CREATE TABLE IF NOT EXISTS users (
	id varchar(40) PRIMARY KEY NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	created timestamp DEFAULT CURRENT_TIMESTAMP,
	updated timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventories (
	id varchar(40) PRIMARY KEY NOT NULL,
	name varchar(255) NOT NULL,
	expiration date NOT NULL,
	user_id varchar(40) REFERENCES users(id) NOT NULL,
	created timestamp DEFAULT CURRENT_TIMESTAMP,
	updated timestamp DEFAULT CURRENT_TIMESTAMP
);
