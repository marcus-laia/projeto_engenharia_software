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

const resolvers = {
  Query: {
    getUserInfo: async (_, args) => {
      const id = args.userId;

      const connection = connectToDatabase();

      const userQuery = `SELECT * FROM users WHERE user_id = ${id}`;
      const user = (await runQuery(connection, userQuery))[0];

      let location;
      const locationQuery = `SELECT * FROM locations WHERE location_id = ${user.location_id}`;
      location = (await runQuery(connection, locationQuery))[0];

      if (!location) {
        location = {
          country: 'Unknown',
          state: 'Unknown',
          city: 'Unknown',
          postal_code: 'Unknown'
        };
      }

      connection.end();

      const userInfo = {
        username: user.name,
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
      const masterProductsQuery = `
        SELECT
          product_id AS id,
          name,
          image,
          sku
        FROM 
          products
      `;
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
          product_id,
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
        id: masterProduct.product_id,
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
      const user_id = args.currentUserId;
      // all chats in the database
      const chatsQuery = `
        (
          SELECT
            c.chat_id AS chatId,
            c.user1_id AS currentUserName,
            u.name AS otherUserName,
            c.user2_id AS otherUserId,
            c.last_message AS lastMessage
          FROM
            chats c
          LEFT JOIN
            users u
          ON
            c.user2_id = u.user_id            
          WHERE
            user1_id = ${user_id}
        )
        UNION ALL
        (
          SELECT
            c.chat_id AS chatId,
            c.user2_id AS currentUserName,
            u.name AS otherUserName,
            c.user1_id AS otherUserId,
            c.last_message AS lastMessage
          FROM
            chats c
          LEFT JOIN
              users u
            ON
              c.user1_id = u.user_id   
          WHERE
            user2_id = ${user_id} AND user1_id != ${user_id}
        )
      `;
      // last condition avoid to return the same chat twice if the user is in both columns
      const connection = connectToDatabase();
      const chats = await runQuery(connection, chatsQuery);
      connection.end();

      const allChats = {
        data: {
          chats: chats
        }
      };
      return allChats;
    },

    getChat: async (_, args) => {
      const current_user_id = args.currentUserId;
      const other_user_id = args.otherUserId;
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
        ORDER BY
          datetime ASC
      `;
      const connection = connectToDatabase();
      const chat = await runQuery(connection, chatQuery);
      connection.end();

      const chatResponse = {
        data: {
          messages: chat
        }
      };

      return chatResponse;
    },

    negotiation: async (_, args) => {
      const user_id_1 = args.userId1;
      const user_id_2 = args.userId2;
      
      const connection = connectToDatabase();
      // negotiation id between two users
      const negotiationQuery = `
        SELECT
          negotiation_id AS negotiationId
        FROM
          negotiations
        WHERE
          user1_id = ${user_id_1} AND user2_id = ${user_id_2}
          OR
          user1_id = ${user_id_2} AND user2_id = ${user_id_1}
      `;
      const negotiation = (await runQuery(connection, negotiationQuery))[0];

      let negotiationId;
      if (!negotiation) {
        // create a new negotiation
        const createNegotiationQuery = `
          INSERT INTO negotiations (user1_id, user2_id, status)
          VALUES (${user_id_1}, ${user_id_2}, 'active')
        `;
        await runQuery(connection, createNegotiationQuery);
        // get the negotiation id
        negotiationId = (await runQuery(connection, negotiationQuery))[0].negotiationId;
      } else {
        negotiationId = negotiation.negotiationId;
      }

      connection.end();
  
      return { negotiationId };
    },

    getNegotiationProducts: async (_, args) => {
      const negotiation_id = args.negotiationId;
      const user_id = args.userId;
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

      try {
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
          success: true,
          message: 'Cards added successfully',
          userProductsList: {
            id: 1,
            userID: userId,
            products: userProducts
          }
        };
      } catch (error) {
        connection.end();
        console.log('Error adding cards:', error);
        return {
          success: false,
          message: "Error adding cards",
          products: []
        };
      }
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
          WHERE user_id = ${userId} AND user_product_id IN (${productIds.join(',')})
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
      const message = args.text;
      const fromUserId = args.currentUserId;
      const toUserId = args.otherUserId;

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
            user1_id = ${fromUserId} AND user2_id = ${toUserId}
            OR
            user1_id = ${toUserId} AND user2_id = ${fromUserId}
        `;
        const chat = (await runQuery(connection, chatQuery))[0];

        // if there is no chat, create a new one
        if (!chat) {
          const createChatQuery = `
            INSERT INTO chats (user1_id, user2_id)
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
    },
    
    addCardsToNegotiation: async (_, args) => {
      const userId = args.userId;
      const negotiationId = args.negotiationId;
      const productIds = args.productIds;
      
      const connection = connectToDatabase();

      try {
        // iterate over productIds
        for (let i = 0; i < productIds.length; i++) {
          const productId = productIds[i];
          // add card to negotiations_products table
          const addCardToNegotiationQuery = `
            INSERT INTO negotiations_products (negotiation_id, user_product_id)
            VALUES (${negotiationId}, ${productId})
          `;
          await runQuery(connection, addCardToNegotiationQuery);
        }

        // get user_product_list
        const userProductsQuery = `
          SELECT
            up.product_id AS id,
            mp.name,
            mp.image,
            mp.sku
          FROM user_products up
          INNER JOIN products mp
          ON up.product_id = mp.product_id
          WHERE up.user_product_id IN (${productIds.join(',')})
        `;
        const userProducts = await runQuery(connection, userProductsQuery);

        connection.end();

        return {
          success: true,
          message: 'Cards added successfully',
          userProductsList: {
            id: 1,
            userID: userId,
            products: userProducts
          }
        };
      } catch (error) {
        connection.end();
        console.log('Error adding cards:', error);
        return {
          success: false,
          message: "Error adding cards",
          products: []
        };
      }
    },

    removeCardsFromNegotiation: async (_, args) => {
      const userId = args.userId;
      const negotiationId = args.negotiationId;
      const productIds = args.productIds;

      const connection = connectToDatabase();
      try {
        // remove card to user_products table
        const removeCardFromNegotiationQuery = `
          DELETE FROM negotiations_products
          WHERE negotiation_id = ${negotiationId} AND user_product_id IN (${productIds.join(',')})
        `;
        await runQuery(connection, removeCardFromNegotiationQuery);

        // get user_product_list
        const userProductsQuery = `
          SELECT
            up.product_id AS id,
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
          userProductsList: {
            id: 1,
            userID: userId,
            products: userProducts
          }
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
    }
  },
};

module.exports = { resolvers };