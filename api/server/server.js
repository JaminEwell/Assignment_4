const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Inventory Products API v1.0";

const productsDB = [
    {
      id: 1, name: 'V-neck shirt', price: 10.99, category: 'Shirts',
      image: '<a href="https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80">View</a>'
    },
    {
        id: 2, name: 'Green Shorts', price: 16.99, category: 'Jeans',
        image: '<a href="https://images.pexels.com/photos/5693888/pexels-photo-5693888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">View</a>'
    },
  ];


const resolvers = {
  Query: {
    about: () => aboutMessage,
    productList,
  },
  Mutation: {
    setAboutMessage,
  },

};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function productList() {
    return productsDB
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function () {
  console.log('App started on port 3000');
});