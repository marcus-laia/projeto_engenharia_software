import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productID: ID!) {
    getProductDetails(productID: $productID) {
      id
      name
      image
      sku
      collection
      text_description
      owner_id
    }
  }
`;