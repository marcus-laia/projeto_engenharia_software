import { gql } from '@apollo/client';

export const ADD_CARDS = gql`
  mutation AddCards($userId: ID!, $productIds: [ID!]!) {
    addCards(userId: $userId, productIds: $productIds) {
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
