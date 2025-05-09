import { render, screen } from '@testing-library/react';
import About from '../pages/About';

jest.mock('../components/ProtectedRoute', () => ({
  ProtectedRoute: (Component: React.ComponentType) => Component
}));

describe('About Page', () => {
  test('renders About page content', () => {
    render(<About />);

    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText(/JobHunt is your trusted job portal/i)).toBeInTheDocument();
    expect(screen.getByText('What We Do')).toBeInTheDocument();
    expect(screen.getByText('Our Goal')).toBeInTheDocument();
    expect(screen.getByText(/Start your journey with JobHunt/i)).toBeInTheDocument();

    expect(screen.getByText(/Browse through a wide variety of job listings/i)).toBeInTheDocument();
    expect(screen.getByText(/Just click "Apply"/i)).toBeInTheDocument();
    expect(screen.getByText(/Track your applications/i)).toBeInTheDocument();
  });
});
