// import modules to connect to database and run queries
const mysql = require('mysql');
const { promisify } = require('util');

// Function to connect to the database
const connectToDatabase = () => {
  // Create a connection
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha123pass',
    database: 'tept'
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

const resolvers = {
    Query: {
        getProducts: async (_, args) => {
            const productsQuery = `SELECT *, (id + 1000) AS sku FROM products`;
            const connection = connectToDatabase();
            const products = await runQuery(connection, productsQuery);
            connection.end();
            return products;
        },

        getUserInfo: async (_, args) => {
            const id = args.userId;
            
            const connection = connectToDatabase();

            const userQuery = `SELECT * FROM users WHERE id = ${id}`;
            const user = (await runQuery(connection, userQuery))[0];

            const locationQuery = `SELECT * FROM locations WHERE id = ${user.location_id}`;
            const location = (await runQuery(connection, locationQuery))[0];

            connection.end();

            const userInfo = {
                username: user.name,
                email: user.email,
                id: user.id,
                location: {
                    country: location.country,
                    state: location.state,
                    city: location.city,
                    postalCode: location.postal_code
                }
            };

            return userInfo;
        },

        getUserProducts: async (_, args) => {
            const id = args.userId;
            const userProductsQuery = `
                SELECT
                    *,
                    (id + 1000) AS sku
                FROM products
                WHERE id IN (
                    SELECT product_id
                    FROM collections
                    WHERE user_id = ${id}
                )
            `;
            const connection = connectToDatabase();
            const userProducts = await runQuery(connection, userProductsQuery);
            connection.end();
            return userProducts;
        }
    },
};

module.exports = { resolvers };