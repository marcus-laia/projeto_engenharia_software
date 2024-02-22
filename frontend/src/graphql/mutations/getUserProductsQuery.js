import { gql } from '@apollo/client';

export const GET_USER_PRODUCTS = gql`
query GetUserProducts($userId: ID!, $filter: String) {
    products(userId: $userId, filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;