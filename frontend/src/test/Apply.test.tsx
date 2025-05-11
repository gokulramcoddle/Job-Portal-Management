import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Apply from "../components/Apply";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../helpers/apiRequest";

jest.mock("../helpers/apiRequest", () => ({
  apiRequest: jest.fn(),
}));

jest.mock("../components/ProtectedRoute", () => ({
  ProtectedRoute: (Component: any) => Component,
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("Apply Component", () => {
  beforeEach(() => {
    (apiRequest as jest.Mock).mockClear();
  });

  test("renders the application form", () => {
    render(
      <BrowserRouter>
        <Apply />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Firstname/)).toBeInTheDocument();
  });

  test("shows error when submitting empty form", async () => {
    render(
      <BrowserRouter>
        <Apply />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Apply"));
    await waitFor(() => {
      expect(screen.getAllByText("Field cannot be empty !").length).toBeGreaterThan(0);
    });
  });

  test("calls API and shows success toast on valid form submission", async () => {
    (apiRequest as jest.Mock).mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Apply />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Firstname/), { target: { value: "Gokul" } });
    fireEvent.change(screen.getByLabelText(/Lastname/), { target: { value: "ram" } });
    fireEvent.click(screen.getByLabelText(/Male/));
    fireEvent.change(screen.getByLabelText(/Date of Birth/), { target: { value: "2002-12-02" } });
    fireEvent.change(screen.getByLabelText(/10th Percentage/), { target: { value: "85" } });
    fireEvent.change(screen.getByLabelText(/12th Percentage/), { target: { value: "90" } });
    fireEvent.change(screen.getByLabelText(/University CGPA/), { target: { value: "8.7" } });
    fireEvent.change(screen.getByLabelText(/Skills/), { target: { value: "React, Node.js" } });
    fireEvent.change(screen.getByLabelText(/Experience/), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/About You/), { target: { value: "Passionate developer" } });

    fireEvent.click(screen.getByText("Apply"));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith("Job applied successfull");
    });
  });

  test("shows error toast when API fails", async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <BrowserRouter>
        <Apply />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Firstname/), { target: { value: "Gokul" } });
    fireEvent.change(screen.getByLabelText(/Lastname/), { target: { value: "ram" } });
    fireEvent.click(screen.getByLabelText(/Male/));
    fireEvent.change(screen.getByLabelText(/Date of Birth/), { target: { value: "2002-12-02" } });
    fireEvent.change(screen.getByLabelText(/10th Percentage/), { target: { value: "85" } });
    fireEvent.change(screen.getByLabelText(/12th Percentage/), { target: { value: "90" } });
    fireEvent.change(screen.getByLabelText(/University CGPA/), { target: { value: "8.7" } });
    fireEvent.change(screen.getByLabelText(/Skills/), { target: { value: "React, Node.js" } });
    fireEvent.change(screen.getByLabelText(/Experience/), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/About You/), { target: { value: "Passionate developer" } });

    fireEvent.click(screen.getByText("Apply"));

    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalledTimes(1);
      expect(toast.warn).toHaveBeenCalledWith("Network error");
    });
  });
});
