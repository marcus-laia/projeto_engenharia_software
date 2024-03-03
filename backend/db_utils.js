const mysql = require('mysql');

// Function to connect to the database
function connectToDatabase() {
  // Create a connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'marcus',
    password: '042402',
    database: 'database_name'
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

// Function to run a query
function runQuery(connection, query) {
  return new Promise((resolve, reject) => {
    // Execute the query
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Export the functions
module.exports = {
  connectToDatabase,
  runQuery
};