// updateUserLocationMutation.js

import { gql } from '@apollo/client';

export const LocationType = gql`
  type Location {
    country: String
    state: String
    city: String
    postalCode: String
  }
`;

export const LocationInputType = gql`
  input LocationInput {
    country: String
    state: String
    city: String
    postalCode: String
  }
`;

// Define the UpdateUserLocation mutation
export const UPDATE_USER_LOCATION = gql`
  mutation UpdateUserLocation($userId: ID!, $location: LocationInput!) {
    updateUserLocation(userId: $userId, location: $location) {
      success
      message
    }
  }
`;
