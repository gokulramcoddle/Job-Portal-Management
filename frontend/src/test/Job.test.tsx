import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Job from "../pages/Job";
import { BrowserRouter } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";
import { toast } from "react-toastify";

jest.mock("../helpers/apiRequest", () => ({
  apiRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => "mock_token");
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Job Component", () => {
  test("renders job list and navigates on apply click", async () => {
    (apiRequest as jest.Mock).mockImplementation((url: string) => {
      if (url === "/job") {
        return Promise.resolve({
          data: [
            {
              ID: 1,
              jobtitle: "Dev",
              company: "CoddleTech",
              location: "Banglore",
              postedOn: "2025-01-01T00:00:00Z",
            },
          ],
        });
      }
      if (url === "/application/user") {
        return Promise.resolve({ data: [] });
      }
    });

    render(
      <BrowserRouter>
        <Job />
      </BrowserRouter>
    );

    expect(await screen.findByText("Dev")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Apply"));
  });

  test("shows warning toast if already applied", async () => {
    (apiRequest as jest.Mock).mockImplementation((url: string) => {
      if (url === "/job") {
        return Promise.resolve({
          data: [
            {
              ID: 2,
              jobtitle: "QA",
              company: "XYZ Inc",
              location: "Chennai",
              postedOn: "2024-01-02T00:00:00Z",
            },
          ],
        });
      }
      if (url === "/application/user") {
        return Promise.resolve({ data: [{ jobpostID: 2 }] });
      }
    });

    render(
      <BrowserRouter>
        <Job />
      </BrowserRouter>
    );

    expect(await screen.findByText("QA")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Apply"));

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("You have already applied for this job!");
    });
  });

  test("filters jobs by location", async () => {
    (apiRequest as jest.Mock).mockImplementation((url: string, method: string, body?: any) => {
      if (url === "/job") {
        return Promise.resolve({ data: [] });
      }
      if (url === "/application/user") {
        return Promise.resolve({ data: [] });
      }
      if (url === "/job/location") {
        return Promise.resolve({
          data: [
            {
              ID: 3,
              jobtitle: "Tester",
              company: "Accenture",
              location: body.location,
              postedOn: "2024-01-03T00:00:00Z",
            },
          ],
        });
      }
    });

    render(
      <BrowserRouter>
        <Job />
      </BrowserRouter>
    );

    const dropdown = await screen.findByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "Delhi" } });

    expect(await screen.findByText("Tester")).toBeInTheDocument();
  });

  test("shows error toast when job API fails", async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(new Error("Failed"));

    render(
      <BrowserRouter>
        <Job />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unable to fetch job data: Error: Failed");
    });
  });
});
