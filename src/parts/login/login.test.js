import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Login } from "./Login";
import { signIn } from "../../redux/login/reducer";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock("../../redux/login/reducer", () => ({
  signIn: jest.fn(),
  resetOperationType: jest.fn()
}));

describe("Login Component", () => {
  it("renders login form", () => {
    const { getByLabelText, getByText } = render(<Login />);
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("calls signIn function on form submission with valid data", async () => {
    const dispatch = jest.fn();
    const navigate = jest.fn();
    const values = { email: "test@example.com", password: "password123" };

    const { getByLabelText, getByText } = render(
      <Login dispatch={dispatch} navigate={navigate} />
    );

    fireEvent.change(getByLabelText("Email"), {
      target: { value: values.email }
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: values.password }
    });
    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(values);
      expect(dispatch).toHaveBeenCalled(); // You may add more specific assertions based on your implementation
    });
  });

  // Add more test cases for other scenarios as needed
});
