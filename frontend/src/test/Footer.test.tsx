import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

const renderFooter = () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe('Footer Component', () => {
  test('renders logo and description', () => {
    renderFooter();

    const logo = screen.getByAltText('logo');
    const description = screen.getByText(/Job Hunt is your go-to platform/i);

    expect(logo).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('renders Quick Links section with all links', () => {
    renderFooter();

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('My Application')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders Follow Us section with social icons', () => {
    renderFooter();

    expect(screen.getByText('Follow us')).toBeInTheDocument();
    const socialLinks = screen.getAllByRole('link', { name: '' });
    expect(socialLinks.length).toBeGreaterThanOrEqual(4);
  });

  test('renders contact information', () => {
    renderFooter();

    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText(/04632-21342/)).toBeInTheDocument();
    expect(screen.getByText(/jobhunt@gmail.com/)).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    renderFooter();

    expect(
      screen.getByText(/© 2025 Job Portal All Rights Reserved/i)
    ).toBeInTheDocument();
  });
});
