const mysql = require('mysql');
const { connectToDatabase, runQuery } = require('./db_utils');


// Create a connection to the MySQL database
const connection = connectToDatabase();

// Create a dummy table
const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        location_id INT NOT NULL,

        FOREIGN KEY (location_id) REFERENCES locations(id)
    )
`;

const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )
`;

const createCollectionsTableQuery = `
    CREATE TABLE IF NOT EXISTS collections (
        id INT NOT NULL,
        name VARCHAR(255),
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,

        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        UNIQUE(id, user_id, product_id)
    )
`;

const createLocationsTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        country VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        postal_code VARCHAR(255) NOT NULL
    )
`;

// Run queries to create the tables
runQuery(connection, createLocationsTableQuery)
    .then(() => {
        console.log('Locations table created');
    })
    .catch((error) => {
        console.log('Error creating locations table:', error);
    });

runQuery(connection, createUsersTableQuery)
    .then(() => {
        console.log('Users table created');
    })
    .catch((error) => {
        console.error('Error creating users table:', error);
    });

runQuery(connection, createProductsTableQuery)
    .then(() => {
        console.log('Products table created');
    })
    .catch((error) => {
        console.error('Error creating products table:', error);
    });

runQuery(connection, createCollectionsTableQuery)
    .then(() => {
        console.log('Collections table created');
    })
    .catch((error) => {
        console.error('Error creating collections table:', error);
    });

// Close the database connection
connection.end((err) => {
    if (err) {
        console.error('Error closing the database connection:', err);
        return;
    }
    console.log('Database connection closed.');
});