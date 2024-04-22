// const { ApolloServer } = require("apollo-server");
// const { typeDefs } = require('./schema/type-defs.js');
// const { resolvers } = require('./schema/resolvers.js');

// const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//     console.log(`API running at ${url}`);
// });

const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require('./schema/type-defs.js');
const { resolvers } = require('./schema/resolvers.js');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    cors: {
      origin: '*', // Allow requests from any origin during development
      credentials: true, // Allow sending cookies from frontend
    }
    // Disable HTTPS
    // https: false
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
};

startServer();
