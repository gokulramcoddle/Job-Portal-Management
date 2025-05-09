import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../helpers/apiRequest";

jest.mock("../helpers/apiRequest", () => ({
  apiRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Signup Component", () => {
  beforeEach(() => {
    (apiRequest as jest.Mock).mockClear();
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  test("renders the signup form", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Firstname/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lastname/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  test("shows error when submitting empty form fields", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getAllByText("Field cannot be empty !").length).toBeGreaterThan(0);
    });
  });

  test("shows error when email format is invalid", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  test("calls API and shows success toast on valid form submission", async () => {
    (apiRequest as jest.Mock).mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Firstname/), { target: { value: "Gokul" } });
    fireEvent.change(screen.getByLabelText(/Lastname/), { target: { value: "Ram" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "gokul@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith("User registered successfull");
    });
  });

  test("shows error toast when API fails", async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Firstname/), { target: { value: "Gokul" } });
    fireEvent.change(screen.getByLabelText(/Lastname/), { target: { value: "Ram" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "gokul@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/Password/), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith("Unable to post data: Error: Network error");
    });
  });
});
