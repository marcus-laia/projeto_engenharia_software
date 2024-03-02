const { gql } = require('apollo-server');

const typeDefs = gql`

    type Product {
        id: ID!
        name: String!
        image: String
        sku: Int
    }

    type UserProductsList {
        id: ID!
        userID: ID!
        products: [Product]

    }

    type Location {
        country: String!
        state: String!
        city: String!
        postalCode: String!
    }

    type User {
        username: String!
        email: String!
        id: ID!
        location: Location!
        userProductsList: [UserProductsList]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        getProducts(filter: String): [Product]
        getUserInfo(userId: ID!): User
        getUserProducts(userId: ID!, filter: String): [Product]
    }
`;

module.exports = { typeDefs }