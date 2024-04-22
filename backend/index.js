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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: 'http://localhost:3000', // Allow requests from the frontend
    credentials: true, // Allow sending cookies from frontend
  },
  // Disable HTTPS
  https: false,
});

server.applyMiddleware({ app, cors: false });

server.listen().then(({ url }) => {
    console.log(`API running at ${url}`);
});
