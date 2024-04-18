// const { ApolloServer } = require("apollo-server");
// const { typeDefs } = require('./schema/type-defs.js');
// const { resolvers } = require('./schema/resolvers.js');

// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//     console.log(`API running at ${url}`);
// });

const { ApolloServer } = require("apollo-server");
const { typeDefs } = require('./schema/type-defs.js');
const { resolvers } = require('./schema/resolvers.js');
const express = require('express');

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can set specific origins instead of '*'
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.applyMiddleware({ app });

server.listen().then(({ url }) => {
    console.log(`API running at ${url}`);
});
