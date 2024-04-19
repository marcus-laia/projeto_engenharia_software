import { gql } from '@apollo/client';

export const REMOVE_CARDS_FROM_NEGOTIATION = gql`
  mutation RemoveCardsFromNegotiation($userId: ID!, $productIds: [ID!]!) {
    removeCardsFromNegotiation(userId: $userId, productIds: $productIds) {
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