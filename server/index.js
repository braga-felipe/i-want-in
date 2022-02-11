const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  next();
});
const mongoose = require('mongoose');
const { uri } = require('../config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  server.listen({ port: 3002 }).then((res) => {
    console.log(`Server running at ${res.url}`);
  });
});
const db = mongoose.connection;
db.on('error', () => {
  console.log('Failed connecting to database.');
}).once('open', () => {
  console.log('Connected to database!');
});
