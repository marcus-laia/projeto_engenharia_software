import { gql } from '@apollo/client';

export const GET_MASTER_PRODUCTS = gql`
  query GetMasterProducts($filter: String) {
    getMasterProducts(filter: $filter) {
      id
      name
      image
      sku
    }
  }
`;