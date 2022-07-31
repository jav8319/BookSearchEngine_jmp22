const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookShema]!
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
    }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
    user(username: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(description: String!, bookId: String!, image: String, link: String, title: String! ):bookSchema
    deleteBook(savebookId: ID!):bookSchema
  }
`;

module.exports = typeDefs;
