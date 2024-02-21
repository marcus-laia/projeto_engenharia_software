import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($filter: String) {
    products(filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;