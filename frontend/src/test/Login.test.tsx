import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { userName } from "../redux/userSlice";

jest.mock("../helpers/apiRequest", () => ({
  apiRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Login Component", () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (apiRequest as jest.Mock).mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
    
    // Mock localStorage.setItem
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });

  test("shows error when submitting empty form fields", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getAllByText("Field cannot be empty !").length).toBeGreaterThan(0);
    });
  });

  test("shows error when email format is invalid", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email !")).toBeInTheDocument();
    });
  });

  test("calls API and shows success toast on valid login", async () => {
    (apiRequest as jest.Mock).mockResolvedValueOnce({
      data: { username: "gokul" },
      headers: { authorization: "mock_token" },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "gokul@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(apiRequest).toHaveBeenCalledWith("/login", "post", { email: "gokul@gmail.com", password: "password123" });
      expect(toast.success).toHaveBeenCalledWith("Login Successfull");
      expect(dispatchMock).toHaveBeenCalledWith(userName("gokul"));
      expect(localStorage.setItem).toHaveBeenCalledWith('token', "mock_token");
    });
  });

  test("shows error toast when API fails", async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "gokul@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith("login server not reached : Error: Network error");
    });
  });
});
