import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($text: String!, $currentUserId: ID!, $otherUserId: ID!) {
    sendMessage(text: $text, currentUserId: $currentUserId, otherUserId: $otherUserId) {
      status
    }
  }
`;
