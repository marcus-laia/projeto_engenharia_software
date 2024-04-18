const { get } = require('lodash');
const { connectToDatabase, runQuery } = require('./db_utils');


const q = `SELECT *, (id + 1000) as SKU FROM products`;

// single line async function to run the query
const run = async (query) => {
    const conn = connectToDatabase();
    const result = (await runQuery(conn, query));
    console.log(JSON.stringify(result));
    conn.end();    
};

const getUserInfo = async (args) => {
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

    console.log(userInfo);
};

run(q);
getUserInfo({userId: 1});
