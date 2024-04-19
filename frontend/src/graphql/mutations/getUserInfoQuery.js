import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo($userId: ID!) {
    getUserInfo(userId: $userId) {
      username
      email
      id
      location {
        country
        state
        city
        postalCode
      }
    }
  }
`;
