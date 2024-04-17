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
    getUserInfo: async (_, args) => {
      const id = args.userId;

      const connection = connectToDatabase();

      const userQuery = `SELECT * FROM users WHERE user_id = ${id}`;
      const user = (await runQuery(connection, userQuery))[0];

      const locationQuery = `SELECT * FROM locations WHERE location_id = ${user.location_id}`;
      const location = (await runQuery(connection, locationQuery))[0];

      connection.end();

      const userInfo = {
        username: user.username,
        email: user.email,
        id: user.user_id,
        location: {
          country: location.country,
          state: location.state,
          city: location.city,
          postalCode: location.postal_code
        }
      };

      return userInfo;
    },

    getMasterProducts: async (_, args) => {
      // all products in the database
      const masterProductsQuery = `SELECT * FROM products`;
      const connection = connectToDatabase();
      const masterProducts = await runQuery(connection, masterProductsQuery);
      connection.end();
      return masterProducts;
    },

    getProducts: async (_, args) => {
      // all products that are owned by some user
      // ASSUMPTION: return the user_product_id, but master_product name, image, and sku
      const productsQuery = `
        SELECT
          up.user_product_id AS id,
          mp.name,
          mp.image,
          mp.sku
        FROM
          user_products up
        INNER JOIN
          products mp
        ON
          up.product_id = mp.product_id
      `;
      const connection = connectToDatabase();
      const products = await runQuery(connection, productsQuery);
      connection.end();
      return products;
    },

    getUserProducts: async (_, args) => {
      // all products that are owned by a specific user
      const id = args.userId;
      // ASSUMPTION: return the user_product_id, but master_product name, image, and sku
      const userProductsQuery = `
        SELECT
            up.user_product_id AS id,
            mp.name,
            mp.image,
            mp.sku
        FROM user_products up
        INNER JOIN products mp
        ON up.product_id = mp.product_id
        WHERE up.user_id = ${id}
      `;
      const connection = connectToDatabase();
      const userProducts = await runQuery(connection, userProductsQuery);
      connection.end();
      return userProducts;
    },

    getProductDetails: async (_, args) => {
      // details of a specific product
      const id = args.productID;

      const connection = connectToDatabase();

      const userProductQuery = `
        SELECT
          user_id,
          product_id,
          collection,
          text_description
        FROM
          user_products
        WHERE
          user_product_id = ${id}
      `;
      const userProduct = (await runQuery(connection, userProductQuery))[0];

      const masterProductQuery = `
        SELECT
          name,
          image,
          sku
        FROM
          products
        WHERE
          product_id = ${userProduct.product_id}
      `;
      const masterProduct = (await runQuery(connection, masterProductQuery))[0];
      
      connection.end();

      // ASSUMPTION: receive the user_product id and return the master_product id
      const DetailedProduct = {
        id: masterProduct.id,
        name: masterProduct.name,
        image: masterProduct.image,
        sku: masterProduct.sku,
        collection: userProduct.collection,
        text_description: userProduct.text_description,
        owner_id: userProduct.user_id
      };

      return DetailedProduct;
    },

    getAllChats: async (_, args) => {
      const user_id = args.CurrentUserId;
      // all chats in the database
      const chatsQuery = `
        (
          SELECT
            chat_id AS chatId,
            user1_id AS currentUserName,
            user2_id AS otherUserName,
            last_message AS lastMessage
          FROM
            chats
          WHERE
            user_id_1 = ${user_id}
        )
        UNION ALL
        (
          SELECT
            chat_id AS chatId,
            user2_id AS currentUserName,
            user1_id AS otherUserName,
            last_message AS lastMessage
          FROM
            chats
          WHERE
            user_id_2 = ${user_id} AND user_id_1 != ${user_id}
        )
      `;
      // last condition avoid to return the same chat twice if the user is in both columns
      const connection = connectToDatabase();
      const chats = await runQuery(connection, chatsQuery);
      connection.end();
      return chats;
    },

    getChat: async (_, args) => {
      const current_user_id = args.CurrentUserId;
      const other_user_id = args.OtherUserId;
      // all messages in a specific chat
      const chatQuery = `
        SELECT
          from_user_id AS fromUserId,
          message AS content
        FROM
          messages
        WHERE
          from_user_id = ${current_user_id} AND to_user_id = ${other_user_id}
          OR
          from_user_id = ${other_user_id} AND to_user_id = ${current_user_id}
        SORT BY
          datetime ASC
      `;
      const connection = connectToDatabase();
      const chat = await runQuery(connection, chatQuery);
      connection.end();
      return chat;
    },

    getNegotiation: async (_, args) => {
      const user_id_1 = args.UserId1;
      const user_id_2 = args.UserId2;
      // negotiation id between two users
      const negotiationQuery = `
        SELECT
          negotiation_id AS negotiationId
        FROM
          negotiations
        WHERE
          user_id_1 = ${user_id_1} AND user_id_2 = ${user_id_2}
          OR
          user_id_1 = ${user_id_2} AND user_id_2 = ${user_id_1}
      `;
      const connection = connectToDatabase();
      const negotiation = (await runQuery(connection, negotiationQuery))[0];
      connection.end();
      return negotiation;
    },

    getNegotiationProducts: async (_, args) => {
      const negotiation_id = args.NegotiationId;
      const user_id = args.UserId;
      // all products in a specific negotiation
      const negotiationProductsQuery = `
        SELECT
          up.user_product_id AS id,
          mp.name,
          mp.image,
          mp.sku
        FROM
          user_products up
        INNER JOIN
          products mp
        ON
          up.product_id = mp.product_id
        INNER JOIN
          negotiations_products np
        ON
          up.user_product_id = np.user_product_id
        WHERE
          np.negotiation_id = ${negotiation_id} AND up.user_id = ${user_id}
      `;
      const connection = connectToDatabase();
      const negotiationProducts = await runQuery(connection, negotiationProductsQuery);
      connection.end();
      return negotiationProducts;
    }
  },

  Mutation: {
    register: async (_, args) => {
      const { username, password } = args;
      const email = username + '@tept.com';

      const connection = connectToDatabase();

      const registerLoginQuery = `
        INSERT INTO login (username, password)
        VALUES ('${username}', '${password}')
      `;

      const registerUserQuery = `
        INSERT INTO users (name, email)
        VALUES ('${username}', '${email}')
      `;
      
      // create a transaction to ensure that both queries are executed
      try {
        connection.beginTransaction();
        await runQuery(connection, registerLoginQuery);
        await runQuery(connection, registerUserQuery);
        connection.commit();
        connection.end();
        return {
          success: true,
          token: 'token_' + username
        };
      }
      catch (error) {
        connection.end();
        return {
          success: false,
          token: null
        };
      }
    },

    login: async (_, args) => {
      const { username, password } = args;

      const connection = connectToDatabase();

      const loginQuery = `
        SELECT
          u.user_id,
          l.username,
          u.email,
          u.location_id
        FROM
          users u
        INNER JOIN
          login l
        ON
          u.user_id = l.user_id
        WHERE
          l.username = '${username}' AND l.password = '${password}'
      `;
      const user = (await runQuery(connection, loginQuery))[0];

      if (!user) {
        connection.end();
        return {
          success: false,
          token: null,
          userId: null,
          username: null,
          email: null,
          location: {
            country: null,
            state: null,
            city: null,
            postalCode: null
          }
        };
      }

      let location;
      if (user.location_id != null) {
        const locationQuery = `
          SELECT
            country,
            state,
            city,
            postal_code AS postalCode
          FROM
            locations
          WHERE
            location_id = ${user.location_id}
        `;

        location = (await runQuery(connection, locationQuery))[0];
      } else {
        location = {
          country: null,
          state: null,
          city: null,
          postalCode: null
        };
      }

      connection.end();

      return {
        success: true,
        token: 'token_' + username,
        userId: user.user_id,
        username: user.username,
        email: user.email,
        location: location
      };
    },
    
    addCards: async (_, args) => {
      // get userId (int) and productIds (int array) from args
      const userId = args.userId;
      const productIds = args.productIds;
      
      const connection = connectToDatabase();

      // iterate over productIds
      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        // add card to user_products table
        const addCardQuery = `
          INSERT INTO user_products (user_id, product_id)
          VALUES (${userId}, ${productId})
        `;
        await runQuery(connection, addCardQuery);
      }

      // get user_product_list
      const userProductsQuery = `
        SELECT
          up.user_product_id AS id,
          mp.name,
          mp.image,
          mp.sku
        FROM user_products up
        INNER JOIN products mp
        ON up.product_id = mp.product_id
        WHERE up.user_id = ${userId}
      `;
      const userProducts = await runQuery(connection, userProductsQuery);

      connection.end();

      return {
        id: 1,
        userID: userId,
        products: userProducts
      };
    },

    removeCards: async (_, args) => {
      // get userId (int) and productIds (int array) from args
      const userId = args.userId;
      const productIds = args.productIds;

      const connection = connectToDatabase();
      try {
        // remove card to user_products table
        const removeCardQuery = `
          DELETE FROM user_products
          WHERE user_id = ${userId} AND product_id IN (${productIds.join(',')})
        `;
        await runQuery(connection, removeCardQuery);

        // get user_product_list
        const userProductsQuery = `
          SELECT
            up.user_product_id AS id,
            mp.name,
            mp.image,
            mp.sku
          FROM user_products up
          INNER JOIN products mp
          ON up.product_id = mp.product_id
          WHERE up.user_id = ${userId}
        `;
        const userProducts = await runQuery(connection, userProductsQuery);

        connection.end();

        return {
          success: true,
          message: 'Cards removed successfully',
          products: userProducts
        };
      } catch (error) {
        connection.end();
        console.log('Error removing cards:', error);
        return {
          success: false,
          message: "Error removing cards",
          products: []
        };
      }
    },

    sendMessage: async (_, args) => {
      const fromUserId = args.fromUserId;
      const toUserId = args.toUserId;
      const message = args.content;

      const connection = connectToDatabase();

      try {
        // check if there is a chat between the two users
        let chatId;
        const chatQuery = `
          SELECT
            chat_id
          FROM
            chats
          WHERE
            user_id_1 = ${fromUserId} AND user_id_2 = ${toUserId}
            OR
            user_id_1 = ${toUserId} AND user_id_2 = ${fromUserId}
        `;
        const chat = (await runQuery(connection, chatQuery))[0];

        // if there is no chat, create a new one
        if (!chat) {
          const createChatQuery = `
            INSERT INTO chats (user_id_1, user_id_2)
            VALUES (${fromUserId}, ${toUserId})
          `;
          await runQuery(connection, createChatQuery);

          // get the chat id
          chatId = (await runQuery(connection, chatQuery))[0].chat_id;
        } else {
          chatId = chat.chat_id;
        }

        const sendMessageQuery = `
          INSERT INTO messages (chat_id, from_user_id, to_user_id, message, datetime)
          VALUES (${chatId}, ${fromUserId}, ${toUserId}, '${message}', NOW())
        `;
        await runQuery(connection, sendMessageQuery);

        // add last message to chats table
        const updateChatQuery = `
          UPDATE chats
          SET last_message = '${message}'
          WHERE chat_id = ${chatId}
        `;
        await runQuery(connection, updateChatQuery);

        connection.end();

        return {
          status: 'success'
        };
      } catch (error) {
        connection.end();
        return {
          status: 'error'
        };
      }
    },

    updateUserLocation: async (_, args) => {
      const userId = args.userId;
      const { country, state, city, postalCode } = args.location;

      const connection = connectToDatabase();

      try {
        // check if the location already exists
        const locationQuery = `
          SELECT
            location_id
          FROM
            locations
          WHERE
            country = '${country}' AND state = '${state}' AND city = '${city}' AND postal_code = '${postalCode}'
        `;
        const location = (await runQuery(connection, locationQuery))[0];

        let locationId;
        // if the location does not exist, create a new one
        if (!location) {
          const createLocationQuery = `
            INSERT INTO locations (country, state, city, postal_code)
            VALUES ('${country}', '${state}', '${city}', '${postalCode}')
          `;
          await runQuery(connection, createLocationQuery);

          // get the location id
          locationId = (await runQuery(connection, locationQuery))[0].location_id;
        } else {
          locationId = location.location_id;
        }

        // update the user location
        const updateUserLocationQuery = `
          UPDATE users
          SET location_id = ${locationId}
          WHERE user_id = ${userId}
        `;
        await runQuery(connection, updateUserLocationQuery);

        connection.end();

        return {
          success: true,
          message: 'Location updated successfully'
        };
      } catch (error) {
        connection.end();
        console.log('Error updating location:', error);
        return {
          success: false,
          message: 'Error updating location'
        };
      }
    }
  },
};

module.exports = { resolvers };