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

    type AddCardsResponse {
        success: Boolean!
        message: String
        userProductsList: UserProductsList
    }

    type Location {
        country: String
        state: String
        city: String
        postalCode: String
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
        otherUserId: ID!
        lastMessage: String
    }

    type AllChatsAux {
        chats: [Chat]
    }

    type AllChatsResponse {
        data: AllChatsAux
    }

    type Message {
        fromUserId: ID!
        content: String!
    }

    type ChatResponseAux {
        messages: [Message]
    }

    type ChatResponse {
        data: ChatResponseAux
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

    type negotiationResponse {
        negotiationId: ID!
    }

    input LocationInput {
        country: String
        state: String
        city: String
        postalCode: String
    }

    type Query {
        getUserInfo(userId: ID!): User
        getMasterProducts(filter: String): [Product]
        getProducts(filter: String): [Product]
        getUserProducts(userId: ID!, filter: String): [Product]
        getProductDetails(productID: ID!): DetailedProduct
        getAllChats(currentUserId: ID!): AllChatsResponse
        getChat(currentUserId: ID!, otherUserId: ID!): ChatResponse
        negotiation(userId1: ID!, userId2: ID!): negotiationResponse
        getNegotiationProducts(negotiationId: ID!, userId: ID!): [Product]
    }

    type Mutation {
        register(username: String!, password: String!): DefaultResponse
        login(username: String!, password: String!): LoginResponse
        addCards(userId: ID!, productIds: [ID!]!): AddCardsResponse
        removeCards(userId: ID!, productIds: [ID!]!): RemoveCardsResponse
        sendMessage(text: String!, currentUserId: ID!, otherUserId: ID!): StatusResponse
        updateUserLocation(userId: ID!, location: LocationInput!): DefaultResponse
        addCardsToNegotiation(userId: ID!, productIds: [ID!]!, negotiationId: ID!): AddCardsResponse
        removeCardsFromNegotiation(userId: ID!, productIds: [ID!]!, negotiationId: ID!): RemoveCardsResponse
    }
`;

module.exports = { typeDefs }