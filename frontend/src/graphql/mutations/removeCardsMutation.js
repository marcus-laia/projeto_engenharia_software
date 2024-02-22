import { gql } from '@apollo/client';

export const REMOVE_CARDS = gql`
  mutation RemoveCards($userId: ID!, $productIds: [ID!]!) {
    removeCards(userId: $userId, productIds: $productIds) {
      success
      message
      userProductsList {
        id
        userId
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
