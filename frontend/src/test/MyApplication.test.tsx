import { render, screen, waitFor } from "@testing-library/react";
import MyApplication from "../pages/MyApplication";
import { apiRequest } from "../helpers/apiRequest";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../helpers/apiRequest", () => ({
  apiRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  },
}));

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
});

describe("MyApplication Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders application list on successful API call", async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("mock_token");

    (apiRequest as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          ID: 1,
          jobtitle: "Frontend Developer",
          company: "Tech",
          location: "Chennai",
          salary: 60000,
          applied_on: "2024-11-01T12:00:00Z",
        },
      ],
    });

    render(
      <BrowserRouter>
        <MyApplication />
      </BrowserRouter>
    );

    expect(await screen.findByText("Frontend Developer")).toBeInTheDocument();
  });

  test("shows error toast when API call fails", async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("mock_token");
    (apiRequest as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(
      <BrowserRouter>
        <MyApplication />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("Network Error");
    });
  });
});
