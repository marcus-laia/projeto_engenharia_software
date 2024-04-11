import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import Register from "../register";
import { REGISTER_MUTATION } from "../../../graphql/mutations/registerMutation";

const mocks = [
  {
    request: {
      query: REGISTER_MUTATION,
      variables: {
        username: "testUser",
        password: "testPassword",
      },
    },
    result: {
      data: {
        register: {
          token: "testToken",
        },
      },
    },
  },
];

describe("Register component", () => {
  it("should render register form", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getAllByText("Register")[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText("Username")[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText("Password")[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText("Confirm Password")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Register")[0]).toBeInTheDocument();
  });

  it("should submit register form with valid credentials", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </MockedProvider>
    );

    fireEvent.change(screen.getAllByLabelText("Username")[0], {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getAllByLabelText("Password")[0], {
      target: { value: "testPassword" },
    });
    fireEvent.change(screen.getAllByLabelText("Confirm Password")[0], {
      target: { value: "testPassword" },
    });

    fireEvent.click(screen.getAllByText("Register")[2]);

    await waitFor(() =>
      expect(localStorage.getItem("token")).toEqual("testToken")
    );
  });
});
