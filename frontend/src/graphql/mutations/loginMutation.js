import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      token
      userId
      username
      email
      location {
        country
        state
        city
        postalCode
      }
    }
  }
`;