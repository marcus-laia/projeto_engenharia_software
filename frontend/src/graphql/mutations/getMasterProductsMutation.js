import { gql } from '@apollo/client';

export const GET_MASTER_PRODUCTS = gql`
  query GetMasterProducts($filter: String) {
    products(filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;