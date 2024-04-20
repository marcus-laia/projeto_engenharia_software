import { gql } from '@apollo/client';

export const ADD_CARDS_TO_NEGOTIATION = gql`
  mutation AddCardsToNegotiation($userId: ID!, $productIds: [ID!]!, $negotiationId: ID!) {
    addCardsToNegotiation(userId: $userId, productIds: $productIds, negotiationId:$negotiationId) {
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