const mysql = require('mysql');
const { promisify } = require('util');

// Function to connect to the database
const connectToDatabase = () => {
  // Create a connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha123pass',
    database: 'tept_db'
  });

  // Connect to the database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database');
    }
  });

  // Return the connection
  return connection;
}

const runQuery = async (connection, query, params) => {
  const queryAsync = promisify(connection.query).bind(connection);

  try {
    const results = await queryAsync(query, params);
    return results;
  }
  catch (error) {
    throw error;
  }
};


// Create a connection to the MySQL database
const connection = connectToDatabase();

// Create tables
const createLoginTableQuery = `
    CREATE TABLE IF NOT EXISTS login (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL
    )
`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        location_id INT,

        FOREIGN KEY (location_id) REFERENCES locations(location_id)
    )
`;

const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        sku INT
    )
`;

const createUserProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS user_products (
        user_product_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        collection VARCHAR(255),
        text_description TEXT,

        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )
`;

const createLocationsTableQuery = `
    CREATE TABLE IF NOT EXISTS locations (
        location_id INT AUTO_INCREMENT PRIMARY KEY,
        country VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        postal_code VARCHAR(255) NOT NULL
    )
`;

const createChatsTableQuery = `
    CREATE TABLE IF NOT EXISTS chats (
        chat_id INT AUTO_INCREMENT PRIMARY KEY,
        user1_id INT NOT NULL,
        user2_id INT NOT NULL,
        last_message TEXT,

        FOREIGN KEY (user1_id) REFERENCES users(user_id),
        FOREIGN KEY (user2_id) REFERENCES users(user_id)
    )
`;

const createMessagesTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
        chat_id INT NOT NULL,
        from_user_id INT NOT NULL,
        to_user_id INT NOT NULL,
        message TEXT NOT NULL,
        datetime TIMESTAMP NOT NULL,

        FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
        FOREIGN KEY (from_user_id) REFERENCES users(user_id),
        FOREIGN KEY (to_user_id) REFERENCES users(user_id)
    )
`;

const createNegotiationsTableQuery = `
    CREATE TABLE IF NOT EXISTS negotiations (
        negotiation_id INT AUTO_INCREMENT PRIMARY KEY,
        user1_id INT NOT NULL,
        user2_id INT NOT NULL,
        status VARCHAR(255) NOT NULL,

        FOREIGN KEY (user1_id) REFERENCES users(user_id),
        FOREIGN KEY (user2_id) REFERENCES users(user_id)
    )
`;

const createNegotiationsProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS negotiations_products (
        negotiation_id INT NOT NULL,
        user_product_id INT NOT NULL,

        FOREIGN KEY (negotiation_id) REFERENCES negotiations(negotiation_id),
        FOREIGN KEY (user_product_id) REFERENCES user_products(user_product_id)
    )
`;

const createAllTables = async () => {
    // Run queries to create the tables
    await runQuery(connection, createLocationsTableQuery);
    console.log('Locations table created');

    await runQuery(connection, createLoginTableQuery);
    console.log('Login table created');

    await runQuery(connection, createUsersTableQuery);
    console.log('Users table created');

    await runQuery(connection, createProductsTableQuery);
    console.log('Products table created');

    await runQuery(connection, createUserProductsTableQuery);
    console.log('UserProducts table created');

    await runQuery(connection, createChatsTableQuery);
    console.log('Chats table created');

    await runQuery(connection, createMessagesTableQuery);
    console.log('Messages table created');

    await runQuery(connection, createNegotiationsTableQuery);
    console.log('Negotiations table created');

    await runQuery(connection, createNegotiationsProductsTableQuery);
    console.log('NegotiationsProducts table created');

    // Close the database connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
            return;
        }
        console.log('Database connection closed.');
    });
};

createAllTables();