import { render, screen } from '@testing-library/react';
//import { toBeInTheDocument } from '@testing-library/jest-dom'

import App from '../components/App.js';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn React/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders learn react part', () => {
  render(<App />);
  const Element = screen.getByText(/Edit/i);
  expect(Element).toBeInTheDocument();
});