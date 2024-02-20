import { gql } from '@apollo/client';

export const GET_ALL_CHATS = gql`
  query GetAllChats($currentUserId: ID!) {
    getAllChats(currentUserId: $currentUserId) {
       data {
         chats {
          otherUserName
          lastMessage
         }
       }
    }
  }
`;