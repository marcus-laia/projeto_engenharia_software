const mysql = require('mysql');
const { promisify } = require('util');

// Function to connect to the database
const connectToDatabase = () => {
  // Create a connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'backend',
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


// Export the functions
module.exports = {
  connectToDatabase,
  runQuery
};