import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Login from '../login';
import { LOGIN_MUTATION } from '../../../graphql/mutations/loginMutation';

const mocks = [
    {
      request: {
        query: LOGIN_MUTATION,
        variables: {
          username: "testUser",
          password: "testPassword",
        },
      },
      result: {
        data: {
          login: {
            token: "testToken",
            userId: "testUserId",
            username: "testUsername",
            email: "test@example.com",
            location: "testLocation",
          },
        },
      },
    },
  ];
  
  describe("Login component", () => {
    it("should render login form", () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );
  
      expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
      expect(screen.getAllByLabelText("Username")[0]).toBeInTheDocument();
      expect(screen.getAllByLabelText("Password")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
    });
  
    it("should submit login form with valid credentials", async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );
  
      fireEvent.change(screen.getAllByLabelText("Username")[0], {
        target: { value: "testUser" },
      });
      fireEvent.change(screen.getAllByLabelText("Password")[0], {
        target: { value: "testPassword" },
      });
  
      fireEvent.click(screen.getAllByText("Login")[2]);
  
      await waitFor(() =>
        expect(localStorage.getItem("customer_token")).toEqual("testToken")
      );
      await waitFor(() =>
        expect(localStorage.getItem("userId")).toEqual("testUserId")
      );
      await waitFor(() =>
        expect(localStorage.getItem("userUsername")).toEqual("testUsername")
      );
      await waitFor(() =>
        expect(localStorage.getItem("userEmail")).toEqual("test@example.com")
      );
      await waitFor(() =>
        expect(localStorage.getItem("userLocation")).toEqual("testLocation")
      );
    });

  });