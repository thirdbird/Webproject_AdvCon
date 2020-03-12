-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a todo.
CREATE TABLE IF NOT EXISTS todos (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	todo VARCHAR(100) NOT NULL,
	account_id INT UNSIGNED,
	FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- Create a table to store blogposts in.
CREATE TABLE IF NOT EXISTS blogposts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	post VARCHAR(500) NOT NULL,
	account_user VARCHAR(30) NOT NULL,
	FOREIGN KEY (account_user) REFERENCES accounts(username)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "123");
INSERT INTO accounts (username, password) VALUES ("Bob", "123");

-- Create a dummy  for testing.
INSERT INTO todos (todo, account_id) VALUES ("Do the dishes Alice",1);
INSERT INTO todos (todo, account_id) VALUES ("Do the dishes Bob",2);

INSERT INTO blogposts (title, post, account_user) VALUES ("This is a blog post", "this is a blog post desc", "Alice");
INSERT INTO blogposts (title, post, account_user) VALUES ("Bob blogposts", "this is another blog post desc", "Bob");


