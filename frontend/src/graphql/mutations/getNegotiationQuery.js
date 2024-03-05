import { gql } from '@apollo/client';

export const GET_NEGOTIATION = gql`
query GetNegotiation($userId1: ID!, $userId2: ID!) {
    negotiation(userId1: $userId1, userId2: $userId2) {
      negotiationId
    }
  }
`;