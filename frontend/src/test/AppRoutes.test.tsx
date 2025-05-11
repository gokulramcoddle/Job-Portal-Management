import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppRoutes from '../components/AppRoutes';
import usernameReducer from '../redux/userSlice';

jest.mock('../pages/Home', () => () => <div>Home Page</div>);
jest.mock('../pages/Login', () => () => <div>Login Page</div>);
jest.mock('../pages/Signup', () => () => <div>Signup Page</div>);
jest.mock('../pages/Job', () => () => <div>Jobs Page</div>);
jest.mock('../components/Apply', () => () => <div>Apply Page</div>);
jest.mock('../pages/MyApplication', () => () => <div>My Applications Page</div>);
jest.mock('../pages/About', () => () => <div>About Page</div>);

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const renderWithProviders = (initialRoute: string) => {
  const store = configureStore({
    reducer: { username: usernameReducer },
    preloadedState: { username: { user: 'TestUser' } },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </Provider>
  );
};

describe('AppRoutes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Home when accessing "/" with token', () => {
    localStorage.setItem('token', 'mockToken');
    renderWithProviders('/');
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  it('renders Login on /login', () => {
    renderWithProviders('/login');
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders Signup on /signup', () => {
    renderWithProviders('/signup');
    expect(screen.getByText(/signup page/i)).toBeInTheDocument();
  });

  it('renders Jobs when token is present', () => {
    localStorage.setItem('token', 'mockToken');
    renderWithProviders('/job');
    expect(screen.getByText(/jobs page/i)).toBeInTheDocument();
  });

  it('renders MyApplications when token is present', () => {
    localStorage.setItem('token', 'mockToken');
    renderWithProviders('/application');
    expect(screen.getByText(/my applications page/i)).toBeInTheDocument();
  });

  it('renders About when token is present', () => {
    localStorage.setItem('token', 'mockToken');
    renderWithProviders('/about');
    expect(screen.getByText(/about page/i)).toBeInTheDocument();
  });

  it('redirects to Login for unknown route', () => {
    renderWithProviders('/some-unknown-route');
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});