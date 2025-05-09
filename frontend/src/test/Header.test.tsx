import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../components/Header";
import usernameReducer from "../redux/userSlice";
import { ToastContainer } from "react-toastify";

const renderWithStore = () => {
  const store = configureStore({
    reducer: { username: usernameReducer },
    preloadedState: { username: { user: "gokul" } },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
        <ToastContainer />
      </MemoryRouter>
    </Provider>
  );
};

describe("Header Component", () => {
  test("renders navigation links", () => {
    renderWithStore();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/my application/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  test("renders user name correctly", () => {
    renderWithStore();
    expect(screen.getByText("GOKUL")).toBeInTheDocument();
  });

  test("shows logout toast on clicking logout button", async () => {
    renderWithStore();

    fireEvent.click(screen.getByText(/log out/i));
    await waitFor(() =>
      expect(screen.getByText(/are you sure you want to log out\?/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/yes/i));

    await waitFor(() =>
      expect(screen.getByText(/logout successful/i)).toBeInTheDocument()
    );
  });

  test("navigates to correct routes when clicking links", () => {
    renderWithStore();

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/home");
    expect(screen.getByRole("link", { name: /jobs/i })).toHaveAttribute("href", "/job");
    expect(screen.getByRole("link", { name: /my application/i })).toHaveAttribute("href", "/application");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
  });
});
