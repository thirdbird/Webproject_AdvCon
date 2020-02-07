CREATE TABLE humans(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100),
	age INT
);
-- Create a dummy human for testing.
INSERT INTO humans (name, age) VALUES ("Alice", 123), ("Bob", 456);

-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "abc123");


-- Create a schedule.
CREATE TABLE schedule(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	monday VARCHAR(100) NULL,
	tuesday VARCHAR(100) NULL,
	wednesday VARCHAR(100) NULL,
	thursday VARCHAR(100) NULL,
	friday VARCHAR(100) NULL,
	saturday VARCHAR(100) NULL,
	sunday VARCHAR(100) NULL
);

-- Create a dummy schedule for testing.
INSERT INTO schedule (tuesday, wednesday, saturday) VALUES ("Need to go and get groceries at Willy's.", "Haircut appointment at 16.30", "Pick up girlfriend at the airport, plane arrival 11.30");
