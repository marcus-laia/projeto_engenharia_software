import { gql } from '@apollo/client';

export const ADD_CARDS_TO_NEGOTIATION = gql`
  mutation AddCardsToNegotiation($userId: ID!, $productIds: [ID!]!) {
    addCardsToNegotiation(userId: $userId, productIds: $productIds) {
      success
      message
      userProductsList {
        id
        userID
        products {
          id
          name
          image
          sku
        }
      }
    }
  }
`;