-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "123");
INSERT INTO accounts (username, password) VALUES ("Bob", "123");
INSERT INTO accounts (username, password) VALUES ("Claire", "123");
INSERT INTO accounts (username, password) VALUES ("Max", "123");

-- Create a todo.
CREATE TABLE IF NOT EXISTS todos (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	todo VARCHAR(100) NOT NULL,
	username INT,
	FOREIGN KEY (username) REFERENCES accounts(username)
);

-- Create a table to store blogposts in.
CREATE TABLE IF NOT EXISTS blogposts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	post VARCHAR(500) NOT NULL
);
