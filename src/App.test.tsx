import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { DefaultTemplate } from './components/defaultTemplate/DefaultTemplate';
import { Dashboard } from './components/dashboard/Dashboard';
import { LandingPage } from './components/landingPage/LandingPage';
import { Header } from './components/header/Header';

test('see if correct text on landing page', () => {
  render(<LandingPage />);
  const textElement = screen.getByText(/Connect with your clients/i);
  expect(textElement).toBeInTheDocument();
});


