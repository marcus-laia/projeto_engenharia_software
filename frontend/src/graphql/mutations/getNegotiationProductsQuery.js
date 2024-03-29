import { gql } from '@apollo/client';

export const GET_NEGOTIATION_PRODUCTS = gql`
  query GetNegotiationProducts($negotiationId: ID!, $userId: ID!) {
    products(negotiationI: $negotiationId, userId: $userId) {
      id
      name
      image
      sku
    }
  }
`;