import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($filter: String) {
    getProducts(filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;