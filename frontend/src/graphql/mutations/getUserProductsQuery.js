import { gql } from '@apollo/client';

export const GET_USER_PRODUCTS = gql`
query GetUserProducts($userId: ID!, $filter: String) {
    getUserProducts(userId: $userId, filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;