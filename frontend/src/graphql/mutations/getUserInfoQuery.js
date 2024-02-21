import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo {
    userInfo {
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
