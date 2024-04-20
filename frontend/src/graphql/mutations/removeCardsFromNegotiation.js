import { gql } from '@apollo/client';

export const REMOVE_CARDS_FROM_NEGOTIATION = gql`
  mutation RemoveCardsFromNegotiation($userId: ID!, $productIds: [ID!]!, $negotiationId: ID!) {
    removeCardsFromNegotiation(userId: $userId, productIds: $productIds, negotiationId:$negotiationId) {
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