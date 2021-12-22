const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    // context: authMiddleware 
  });
  // start apollo server
  await server.start();

// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app })

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

//initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});