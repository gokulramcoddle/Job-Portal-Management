import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

const DummyComponent = () => <div>Protected Content</div>;
const LoginPage = () => <div>Login Page</div>;

const ProtectedDummy = ProtectedRoute(DummyComponent);

describe("ProtectedRoute", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("renders the protected component when token is present", () => {
    localStorage.setItem("token", "fakeToken");

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedDummy />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to login when token is absent", () => {
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedDummy />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
