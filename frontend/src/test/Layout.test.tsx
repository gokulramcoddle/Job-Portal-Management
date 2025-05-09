import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

jest.mock("../components/Header", () => () => <div>Mocked Header</div>);
jest.mock("../components/Footer", () => () => <div>Mocked Footer</div>);

describe("Layout", () => {
  test("renders Header, Footer, and Outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/test" element={<Layout />}>
            <Route index element={<div>Test Outlet Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Mocked Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocked Footer/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Outlet Content/i)).toBeInTheDocument();
  });
});
