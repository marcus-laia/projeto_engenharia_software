import { gql } from '@apollo/client';

export const GET_CHAT = gql`
  query GetChat($currentUserId: ID!, $otherUserId: ID!) {
    getChat(currentUserId: $currentUserId, otherUserId: $otherUserId) {
       data{
         messages {
          fromUserId
          content
         }
       }
    }
  }
`;