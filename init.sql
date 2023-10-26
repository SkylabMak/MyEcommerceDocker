-- Create User table

CREATE TABLE User (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    Role ENUM('buyer', 'seller') NOT NULL
);

-- Create Bill table
CREATE TABLE Bill (
    idBill INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT NOT NULL,
    totalPrice INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);


-- Create Product table
CREATE TABLE Product (
    idProduct INT AUTO_INCREMENT PRIMARY KEY,
    idUser INT,
    ProductName VARCHAR(255) NOT NULL,
    Description VARCHAR(255),
    price INT NOT NULL,
    remaining INT NOT NULL,
    FOREIGN KEY (idUser) REFERENCES User(idUser)
);



-- Create BillList table
CREATE TABLE BillList (
    idBillList INT AUTO_INCREMENT PRIMARY KEY,
    idBill INT,
    idProduct INT,
    Quantity INT NOT NULL,
    FOREIGN KEY (idBill) REFERENCES Bill(idBill),
    FOREIGN KEY (idProduct) REFERENCES Product(idProduct)
);


-- Create Cart table
CREATE TABLE Cart (
    idUser INT,
    idProduct INT,
    Quantity INT NOT NULL,
    PRIMARY KEY (idUser, idProduct),
    FOREIGN KEY (idUser) REFERENCES User(idUser),
    FOREIGN KEY (idProduct) REFERENCES Product(idProduct)
);


--  INSERT ---------------------------------------
INSERT INTO User (UserName, password, Role)
VALUES 
    ('Mek', 'pw999', 'seller'),
    ('john_doe', 'password123', 'buyer'),
    ('jane_doe', 'password456', 'buyer');


-- Insert into Product table
INSERT INTO Product (idUser, ProductName, Description, price, remaining)
VALUES 
    (1, 'earphones', 'this is earphones', 50, 10),
    (1, 'Charging cable', 'this is Charging cable', 75, 5),
    (1, 'mouse pad', 'this is mouse pad', 299, 7);

-- Insert into Bill table
INSERT INTO Bill (idUser, totalPrice)
VALUES 
    (2, 300),
    (2, 250),
    (3, 299);

-- Insert into BillList table
INSERT INTO BillList (idBill, idProduct, Quantity)
VALUES 
    (1, 1, 3),
    (1, 2, 2),
    (2, 1, 5),
    (3, 3, 1);

-- Insert into Cart table
INSERT INTO Cart (idUser, idProduct, Quantity)
VALUES 
    (2, 3, 1),
    (1, 1, 2);


INSERT INTO Cart (idUser, idProduct, Quantity)
VALUES 
    (1, 3, 1);    
