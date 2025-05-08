import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { BrowserRouter, useNavigate } from 'react-router-dom';

jest.mock('../components/ProtectedRoute', () => ({
  ProtectedRoute: (component: any) => component,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home Component', () => {
  test('renders the home page content', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/WELCOME TO/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore job opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/Start hunting. Start winning.../i)).toBeInTheDocument();
  });

  test('navigates to /job page when the "Explore jobs" button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Explore jobs/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/job');
  });
});
