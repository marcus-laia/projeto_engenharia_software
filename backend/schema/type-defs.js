const { gql } = require('apollo-server');

const typeDefs = gql`

    type Product {
        id: ID!
        name: String!
        image: String
        sku: Int
    }

    type DetailedProduct {
        id: ID!
        name: String!
        image: String
        sku: Int
        collection: String
        text_description: String
        owner_id: ID!
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

    type Chat {
        chatId: ID!
        currentUserName: String!
        otherUserName: String!
        lastMessage: String
    }

    type Message {
        fromUserId: ID!
        content: String!
    }

    type LoginResponse {
        success: Boolean!
        token: String
        userId: ID
        username: String
        email: String
        location: Location
    }

    type RemoveCardsResponse {
        success: Boolean!
        message: String
        userProductsList: [UserProductsList]
    }

    type StatusResponse {
        status: String
    }

    type DefaultResponse {
        success: Boolean!
        message: String
        token: String
    }

    input LocationInput {
        country: String
        state: String
        city: String
        postalCode: String
    }

    type Query {
        getUserInfo(userId: ID!): User
        getMasterProducts: [Product]
        getProducts(filter: String): [Product]
        getUserProducts(userId: ID!, filter: String): [Product]
        getProductDetails(productID: ID!): DetailedProduct
        getAllChats(currentUserId: ID!): [Chat]
        getChat(currentUserId: ID!, otherUserId: ID!): [Message]
        getNegotiation(userId1: ID!, userId2: ID!): ID
        getNegotiationProducts(negotiationId: ID!, userId: ID!): [Product]
    }

    type Mutation {
        register(username: String!, password: String!): DefaultResponse
        login(username: String!, password: String!): LoginResponse
        addCards(userId: ID!, productIds: [ID!]!): UserProductsList
        removeCards(userId: ID!, productIds: [ID!]!): RemoveCardsResponse
        sendMessage(fromUserId: ID!, toUserId: ID!, content: String!): StatusResponse
        updateUserLocation(userId: ID!, location: LocationInput!): DefaultResponse
    }
`;

module.exports = { typeDefs }